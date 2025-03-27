import { getServerSession } from "next-auth"; // Assuming you use next-auth
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { authOptions } from "@/utils/auth";







export const DELETE = async (req) => {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Extract category ID
    const { id, name } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "ID is required for deletion!" }, { status: 400 });
    }

    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ message: `Category: ${name} deleted successfully` }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};








export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories, { status: 200 }));
  } catch (e) {
    console.log(e);
    return new NextResponse(
      { message: "Sorry Something went terribly wrong" },
      { status: 500 }
    );
  }
};








export const POST = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id, title, slug, image, color } = await req.json();

    const generatedSlug = slug || slugify(title, { lower: true, strict: true });

    let category;
    if (id) {
      category = await prisma.category.update({
        where: { id },
        data: { title, slug: generatedSlug, image, color },
      });
    } else {
      category = await prisma.category.create({ 
        data: { title, slug: generatedSlug, image, color } 
      });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
