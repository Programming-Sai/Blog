import React from "react";
import PreviewWrapper from "@/components/previewpagewrapper/PreviewPageWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

const slugs = [
  "understanding-react-hooks",
  "css-grid-layout-guide",
  "building-a-nextjs-blog",
  "introduction-to-typescript",
  "optimizing-performance-in-react",
];

export async function generateStaticParams() {
  return slugs.map((slug) => ({
    slug, // Matches the [slug] parameter in the URL
  }));
}

const PreviewPage = async () => {
   // const session = {user:{role:'ADMIN'}};
    const session = await getServerSession(authOptions);
  
    // Server-side check for user session
    if (session?.user?.role !== "ADMIN") {
      return redirect(`/not-authorized`);
    }
  
  return <PreviewWrapper />;
};

export default PreviewPage;
