import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const featuredPost = await prisma.post.findFirst({
      where: { isFeatured: true },
      orderBy: {
        lastModified: "desc",
      },
    });
    return new NextResponse(JSON.stringify(featuredPost, { status: 200 }));
  } catch (e) {
    console.log(e);
    return new NextResponse(
      { message: "Sorry Something went terribly wrong" },
      { status: 500 }
    );
  }
};
