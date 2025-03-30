import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  try {
    const { searchParams } = req.nextUrl;
    const slug = searchParams.get("slug");
    const id = searchParams.get("id"); // Optional: Post ID if editing

    if (!slug) {
      return new NextResponse(
        JSON.stringify({ message: "Slug is required" }),
        { status: 400 }
      );
    }

    // Find a post with the given slug
    const existingPost = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });

     // If no post exists with that slug, it's unique.
    // If it exists and we are editing (id provided) and the IDs match, it's unique.
    // Otherwise, it's not unique.
    const isUnique = !existingPost || (id && existingPost.id === id);

    return new NextResponse(JSON.stringify({ isUnique }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went terribly wrong" }),
      { status: 500 }
    );
  }
};
