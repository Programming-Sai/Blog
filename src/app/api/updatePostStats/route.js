import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req) => {
  try {
    const { slug, type } = await req.json();

    if (!slug || !type) {
      return NextResponse.json({ message: "Slug and type are required" }, { status: 400 });
    }

    if (type === "views" || type === "shares") {
      await prisma.post.update({
        where: { slug },
        data: { [type]: { increment: 1 } },
      });

      return NextResponse.json({ message: `${type} incremented` }, { status: 200 });
    }

    if (type === "likes") {
      const cookieStore = cookies();
      const likeCookie = cookieStore.get(`liked_${slug}`);

      if (likeCookie) {
        return NextResponse.json({ message: "You can only like a post once per day" }, { status: 403 });
      }

      await prisma.post.update({
        where: { slug },
        data: { likes: { increment: 1 } },
      });

      cookieStore.set(`liked_${slug}`, "true", {
        maxAge: 86400, // 24 hours
        httpOnly: true,
      });

      return NextResponse.json({ message: "Like added" }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error updating post" }, { status: 500 });
  }
};
