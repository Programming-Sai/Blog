import prisma from "@/utils/connect";

export default async function sitemap() {
    const posts = await prisma.post.findMany();
    const postData = posts.map((post, idx) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}${post?.slug}`,
            lastModified: post?.lastModified
        }
    })
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}about/`,
            lastModified: new Date()
        },
        ...postData,
    ]
};