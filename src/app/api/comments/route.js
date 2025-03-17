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


// 🔥 ADD DELETE METHOD TO THE SAME ENDPOINT 🔥
export const DELETE = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Ensure the comment exists and the user is authorized
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    // Fetch the user role (assuming `role` exists in the user object)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }, // Only fetch the role
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized: Only admins can delete comments" },
        { status: 403 }
      ); 
    }

    await prisma.comment.delete({ where: { id } });

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Sorry, something went terribly wrong" },
      { status: 500 }
    );
  }
};  