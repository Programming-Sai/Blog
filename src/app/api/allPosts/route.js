import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const allPosts = await prisma.post.findMany({
      include: {
        _count: {
          select: { comment: true },
        },
      },
    });

    const formattedPosts = allPosts.map((post) => ({
      id: post?.id,
      title: post?.title,
      slug: post?.slug,
      date: new Date(post?.createdAt).toLocaleDateString("en-GB", {day: "2-digit",month: "short",year: "numeric",}),
      thumbnail: post?.image,
      category: post?.catSlug,
      views: post?.views,
      comments: post?._count.comment, // Renaming 'comment' to 'comments'
      shares: post?.shares,
      likes: post?.likes,
      readingTime: post?.readingTime,
      isFeatured: post?.isFeatured,
      isEditorPick: post?.isEditorPick
    }));
    
    return NextResponse.json(formattedPosts, { status: 200 });  } catch (e) {
    console.error("Error fetching posts:", e); // More detailed logging
    return NextResponse.json(
      { message: "Sorry, something went terribly wrong", error: e.message },
      { status: 500 }
    );
  }
};