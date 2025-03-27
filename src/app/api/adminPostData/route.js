import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const totalPosts = await prisma.post.count();

    const postsByCategory = await prisma.post.groupBy({
      by: ['catSlug'],
      _sum: {
        views: true,
        likes: true,
        shares: true,
      },
    });
    
    
    const allPosts = await prisma.post.findMany({
      select: {
        slug: true,  
        catSlug: true, 
      },
    });

    const commentsByPost = await prisma.comment.groupBy({
      by: ["postSlug"],
      _count: { id: true }, 
    });

    const commentsByCategory = {};
    allPosts.forEach(post => {
      const commentCount =
        commentsByPost.find(comment => comment.postSlug === post.slug)?._count.id || 0;

      if (!commentsByCategory[post.catSlug]) {
        commentsByCategory[post.catSlug] = 0;
      }
      commentsByCategory[post.catSlug] += commentCount;
    });

    const categoryStats = postsByCategory.map(category => ({
      catSlug: category.catSlug,
      totalViews: category._sum.views || 0,
      totalLikes: category._sum.likes || 0,
      totalShares: category._sum.shares || 0,
      totalComments: commentsByCategory[category.catSlug] || 0,
    }));
    
    const latestPosts = await prisma.post.findMany({
      orderBy: { lastModified: 'desc' },
      take: 5, 
      select: {
        slug: true,
        title: true,
        image: true,
        views: true,
        shares: true,
        likes: true,
        _count: {
          select: { comment: true },
        },
      },
    });

    const latestComments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        post: {
          select: { title: true, catSlug: true }, 
        },
        user: {
          select: { name: true, image: true }, 
        },
      },
    });

    const totalDrafts = await prisma.post.count({ where: { isDraft: true }});

    
    return NextResponse.json(
      {
        totalPosts,
        categoryStats,
        latestPosts,
        latestComments,
        totalDrafts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching post data:", error);
    return NextResponse.json(
      { message: "Sorry, something went terribly wrong" },
      { status: 500 }
    );
  }
};
