import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const topPosts = await prisma.post.findMany({
      take: 10,
      orderBy: {
        views: "desc",
      },
    });
    return new NextResponse(JSON.stringify(topPosts, { status: 200 }));
  } catch (e) {
    console.log(e);
    return new NextResponse(
      { message: "Sorry Something went terribly wrong" },
      { status: 500 }
    );
  }
};
