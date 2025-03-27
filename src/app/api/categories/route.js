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

    // Extract category slug
    const { slug, title } = await req.json();
    if (!slug) {
      return NextResponse.json({ message: "Slug is required for deletion!" }, { status: 400 });
    }

    if (slug === "general") {
      return NextResponse.json({ message: "The General category cannot be deleted." }, { status: 400 });
    }    

    // Ensure the "General" category exists
    let generalCategory = await prisma.category.findFirst({
      where: { slug: "general" },
    });

    if (!generalCategory) {
      generalCategory = await prisma.category.create({
        data: { title: "General", slug: "general", color: "#888888" },
      });
    }

    // Count categories
    const categoryCount = await prisma.category.count();
    if (categoryCount <= 1) {
      return NextResponse.json(
        { message: "Cannot delete the last remaining category!" },
        { status: 400 }
      );
    }

    // Reassign posts from the deleted category to "General"
    await prisma.post.updateMany({
      where: { catSlug: slug },
      data: { catSlug: generalCategory.slug },
    });

    // Delete the category
    await prisma.category.delete({ where: { slug } });

    return NextResponse.json(
      { message: `Category: ${title} deleted successfully` },
      { status: 200 }
    );
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
    let { id, title, slug, image, color } = await req.json();

    title = title.charAt(0).toUpperCase() + title.slice(1);

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
