import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let searchTerm = searchParams.get("searchTerm") || ""; // Default to empty string if no searchTerm

  try {
    const searchResult = await prisma.post.findMany({
      where: {
        isDraft: false, 
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            desc: {
              contains: searchTerm,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            catSlug: {
              contains: searchTerm,
              mode: "insensitive", // Case-insensitive search
            },
          },
        ],
        AND: searchTerm ? {} : { title: { not: "" } }, // Filter out empty results when searchTerm is empty
      },
    });

    return NextResponse.json(searchResult, { status: 200 });
  } catch (e) {
    console.error(e); // Log the error for debugging
    return NextResponse.json(
      { message: "Sorry, something went terribly wrong" },
      { status: 500 }
    );
  }
};
