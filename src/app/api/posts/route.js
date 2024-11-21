import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let page = searchParams.get("page");

  // Ensure the page is a positive number and default to 1 if invalid
  page = page && !isNaN(page) && page > 0 ? parseInt(page) : 1;
  const POST_PER_PAGE = 3;

  const queryOne = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    orderBy: {
      createdAt: "desc", // Order by createdAt in descending order to get the most recent posts
    },
  };

  const queryTwo = {
    take: 5,
    orderBy: {
      views: "desc",
    },
  };

  try {
    // Fetch paginated posts and top posts in parallel
    const [paginatedPosts, topPosts] = await Promise.all([
      prisma.post.findMany(queryOne),
      prisma.post.findMany(queryTwo),
    ]);

    // Count the total number of posts
    const count = await prisma.post.count();

    // Return both sets of posts, the count, and the number of posts per page
    return new NextResponse(
      JSON.stringify({ paginatedPosts, topPosts, count, POST_PER_PAGE }),
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return new NextResponse(
      { message: "Sorry, something went terribly wrong" },
      { status: 500 }
    );
  }
};
