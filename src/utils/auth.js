import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
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
      scope: "r_liteprofile r_emailaddress",
      issuer: "https://www.linkedin.com",
      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo",
      },
      tokenUri: "https://www.linkedin.com/oauth/v2/accessToken",
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          scope: "profile email openid",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },

      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
      },
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      //   authorization: {
      //     url: "https://www.facebook.com/v12.0/dialog/oauth",
      //     params: {
      //       scope: "email,public_profile", // Request both email and public profile (name and profile pic)
      //     },
      //   },
      //   profile(profile) {
      //     // Include the necessary user information (name, email, and profile picture)
      //     return {
      //       id: profile.id,
      //       name: profile.name,
      //       email: profile.email,
      //       image: profile.picture.data.url, // This will give the profile picture URL
      //     };
      //   },
    }),
  ],
};

// https://youtu.be/eTpkgNBmrX8     video link for solution to facebook oauth issues. make sure that the setting and permissions are set for both email and public_profile.
