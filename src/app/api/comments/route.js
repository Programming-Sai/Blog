import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../../utils/auth";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (e) {
    console.log(e);
    return new NextResponse(
      { message: "Sorry Something went terribly wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), {
      status: 401,
    });
  }
  try {
    const body = await req.json();
    console.log("Request body:", body);
    console.log("User email from session:", session.user.email);
    const comment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
    });
    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went terribly wrong" }),
      { status: 500 }
    );
  }
};
