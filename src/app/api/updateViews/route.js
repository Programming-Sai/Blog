import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { slug } = await req.json(); // Get `slug` from the request body

    if (!slug) {
      return NextResponse.json({ message: "Slug is required" }, { status: 400 });
    }

    await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ message: "View incremented" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Sorry, unable to update views." },
      { status: 500 }
    );
  }
};
