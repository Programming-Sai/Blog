import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  try {
    const { searchParams } = req.nextUrl;
    const slug = searchParams.get("slug");
    const id = searchParams.get("id"); // Get the post ID if provided

    if (!slug) {
      return new NextResponse(
        JSON.stringify({ message: "Slug is required" }),
        { status: 400 }
      );
    }

    const existingPost = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });

    const isUnique = !existingPost || existingPost.id === id; // Unique if no post exists or if it's the same post being edited

    return new NextResponse(JSON.stringify({ isUnique }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went terribly wrong" }),
      { status: 500 }
    );
  }
};
