import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { parse } from "json2csv"; // For CSV conversion
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

export const GET = async (req) => {

  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 403 }
    );
  }


  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "json"; // Default to JSON
    
    
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        catSlug: true,
        cat: {
          select: {
            slug: true,
            title: true,  // Adjust based on your Category model
          },
        },
        desc: true,
        content: true,
        readingTime: true,
        image: true,
        keywords: true,
        isDraft: true,
        isFeatured: true,
        isEditorPick: true,
        createdAt: true,
        lastModified: true,
        views: true,
        likes: true,
        shares: true,
        media: {
          select: {
            url: true,
            isThumbnail: true,
            type: true,
            size: true,
            publicId: true,
          },
        },
        comment: {
          select: {
            id: true,
            createdAt: true,
            desc: true,
            userEmail: true,
          },
        },
      },
    });
    
    if (format === "csv") {
      // Convert JSON to CSV
      const csv = parse(posts);
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="blog_posts.csv"',
        },
      });
    }

    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="blog_posts.json"',
      },
    });

  } catch (error) {
    console.error("Error exporting posts:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to export posts" }),
      { status: 500 }
    );
  }
};
