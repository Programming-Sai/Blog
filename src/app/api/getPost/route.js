import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Extract the query parameter from the request URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Post id is required." }),
        { status: 400 }
      );
    }

    // Fetch the post from the database by id, including its related media
    const post = await prisma.post.findUnique({
      where: { id },
      include: { media: true }, // Include media; adjust as needed
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found." }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went terribly wrong." }),
      { status: 500 }
    );
  }
};
