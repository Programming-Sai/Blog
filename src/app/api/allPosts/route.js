import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth"; // Assuming NextAuth is used
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
      lastModifiedDate: new Date(post?.lastModified).toLocaleDateString("en-GB", {day: "2-digit",month: "short",year: "numeric",}),
      thumbnail: post?.image,
      category: post?.catSlug,
      views: post?.views,
      comments: post?._count.comment, // Renaming 'comment' to 'comments'
      shares: post?.shares,
      likes: post?.likes,
      readingTime: post?.readingTime,
      isFeatured: post?.isFeatured,
      isDraft: post?.isDraft,
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






export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { id, ...updates } = await req.json();

    if (!id || Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No data to update" }, { status: 400 });
    }

    // Fetch post to check if it's a draft
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Prevent drafts from being featured or editor picks
    if (post.isDraft && (updates.isFeatured || updates.isEditorPick)) {
      return NextResponse.json(
        { message: "Draft posts cannot be Featured or Editor's Pick" },
        { status: 400 }
      );
    }


    // // Ensure only one post is featured
    if (updates.hasOwnProperty("isFeatured") && updates.isFeatured === true) {
      await prisma.post.updateMany({
        where: { isFeatured: true },
        data: { isFeatured: false },
      });
    }


    // Constraint for editor's pick:
    // If isEditorPick is being set to true, ensure there are less than 5 posts currently.
    if (updates.hasOwnProperty("isEditorPick") && updates.isEditorPick === true) {
      const count = await prisma.post.count({ where: { isEditorPick: true } });
      if (count >= 5) {
        return NextResponse.json(
          { message: "Only 5 posts can be Editor's Pick" },
          { status: 400 }
        );
      }
    }

    // Update only the provided fields
    const updatedPost = await prisma.post.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(updatedPost, { status: 200 });

  } catch (e) {
    console.error("Error updating post:", e);
    return NextResponse.json(
      { message: `Something went wrong: ${e.message}`, error: e.message },
      { status: 500 }
    );
  }
};



export const DELETE = async (req) => {
  try {
    console.log("Incoming DELETE request...");

    // Verify admin session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      console.log("Unauthorized attempt");
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Retrieve post ID from request body
    const body = await req.json();
    console.log("Request Body:", body); // Log the request body

    const { id } = body;
    if (!id) {
      console.log("No ID provided");
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    // Proceed with deletion
    console.log(`Deleting post with ID: ${id}`);
    const deletedPost = await prisma.post.delete({ where: { id } });

    console.log("Deleted Post:", deletedPost);
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });

  } catch (e) {
    console.error("Error deleting post:", e);
    return NextResponse.json({ message: "Something went wrong", error: e.message }, { status: 500 });
  }
};
