import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';


export const GET = async (req) => {
  try {
    const { searchParams } = req.nextUrl;
    const slug = searchParams.get("slug");

    if (!slug) {
      return new NextResponse(
        JSON.stringify({ message: "Slug is required" }),
        { status: 400 }
      );
    }

    const exists = await prisma.post.findUnique({
      where: { slug },
      select: { id: true }, // Only fetch ID for efficiency
    });

    return new NextResponse(JSON.stringify({ exists: !!exists }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went terribly wrong" }),
      { status: 500 }
    );
  }
};
