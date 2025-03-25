import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import { getServerSession } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      client: { token_endpoint_auth_method: "client_secret_post" },
      issuer: "https://www.linkedin.com",
      profile: async (profile, tokens) => {
        try {
          const res = await fetch("https://api.linkedin.com/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });
      
          const data = await res.json();
          // console.log("✅ LINKEDIN PROFILE DATA:", data, profile);
      
          return {
            id: data.sub || profile.sub,
            name: data.name || profile.name,
            email: data.email || profile.email,
            image: data.picture || profile.picture,  // Ensure image is set
          };
        } catch (error) {
          console.error("❌ Failed to fetch LinkedIn user info:", error);
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        }
      },      

      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],

  callbacks: {


    async signIn({ user, account }) {
      // console.log("\n\nUSER: ", user)
      if (user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
    
        if (existingUser) {
          // ✅ Ensure the image is updated if missing
          if (!existingUser.image || existingUser.image === "/coding.png") {
            await prisma.user.update({
              where: { email: user.email },
              data: { image: user.image || existingUser.image },
            });
          }

          // console.log("\n\nUpdating user image:", user.image, "\n\nUpdating exsisting image:", existingUser.image, "\n\n`"); 
    
          const linkedAccount = await prisma.account.findFirst({
            where: { userId: existingUser.id, provider: account.provider },
          });
    
          if (!linkedAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
              },
            });
          }
          return true;
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image || null,
            },
          });
    
          await prisma.account.create({
            data: {
              userId: newUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            },
          });
          return true;
        }
      }
      return false;
    },


    async jwt({ token, user }) {
      // Attach the role to the token
      if (user) {
        token.image = user.image;
        // console.log("\n\n✅ JWT user before update:", user, "\nToken Image: ", token.image);
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.email) {
        // console.log("\n\n✅ SESSION TOKEN:", token);
        session.user.image = token.image;
        const updatedUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (updatedUser) {
          session.user.role = updatedUser.role; // Update role from DB
          session.user.id = updatedUser.id;     // Add the user id to the session
        }   
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);

// https://youtu.be/eTpkgNBmrX8     video link for solution to facebook oauth issues. make sure that the setting and permissions are set for both email and public_profile.
