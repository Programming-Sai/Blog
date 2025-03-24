import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 403 }
    );
  }
  try {
    await prisma.comment.deleteMany(); // Delete all comments first (to avoid foreign key issues)
    await prisma.media.deleteMany(); // Delete all media
    await prisma.post.deleteMany(); // Delete all posts

    return new NextResponse(
      JSON.stringify({ message: "All posts deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting all posts:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete posts" }),
      { status: 500 }
    );
  }
};
