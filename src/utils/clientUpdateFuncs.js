"use client"; // Ensure it's marked as a client module

export const updatePostStats = async ({ slug, type }) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/updatePostStats`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, type }),
      cache: "no-store", // ensure we get fresh response
    }
  );
  const data = await result.json();
  console.log("Server message:", data.message);
  if (!result.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const updateViews = async (slug) => {
  return updatePostStats({ slug, type: "views" });
};

export const updateLikes = async (slug) => {
  return updatePostStats({ slug, type: "likes" });
};

export const updateShares = async (slug) => {
  return updatePostStats({ slug, type: "shares" });
};
