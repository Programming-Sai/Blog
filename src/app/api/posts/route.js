import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let page = searchParams.get("page");
  let cat = searchParams.get("cat");

  // Ensure the page is a positive number and default to 1 if invalid
  page = page && !isNaN(page) && page > 0 ? parseInt(page) : 1;

  const POST_PER_PAGE = 3;

  const paginatedPosts = await prisma.post.findMany({
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    orderBy: {
      lastModified: "desc",
    },
    where: {
      ...(cat && { catSlug: cat }),
    },
  });
  const count = await prisma.post.count({
    where: {
      ...(cat && { catSlug: cat }),
    },
  });

  try {
    return new NextResponse(
      JSON.stringify({ paginatedPosts, POST_PER_PAGE, count }, { status: 200 })
    );
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went terribly wrong" }),
      { status: 500 }
    );
  }
};
