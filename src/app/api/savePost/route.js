import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { handleImageDelete } from "@/utils/imageHandler"; // Import your deletion handler

export const POST = async (req) => {
  try {
    // Parse the incoming JSON payload
    const {
      id,              // Optional: if provided, update post; else, create new
      slug,
      title,
      category,
      description,
      blogContent,
      readingTime,
      image,
      draft,
      keywords,
      media: newMedia, // Array of media objects from the frontend
    } = await req.json();

    let post;

    if (id) {
      const existingPost = await prisma.post.findUnique({
        where: { id },
      });
      if (!existingPost) {
        return new NextResponse(
          JSON.stringify({ message: "Post not found" }),
          { status: 404 }
        );
      }
      // Use the provided values if available, or fallback to the existing ones
      post = await prisma.post.update({
        where: { id },
        data: {
          // If slug/title are missing, keep the existing ones.
          slug: slug || existingPost.slug,
          title: title || existingPost.title,
          catSlug: category !== "Select A Category" ? `${category.toLowerCase()}` : "" || existingPost.catSlug,
          desc: description || existingPost.desc,
          content: blogContent || existingPost.content,
          readingTime: readingTime || existingPost.readingTime,
          image: image || existingPost.image,
          keywords: keywords || existingPost.keywords,
          isDraft: draft,
          lastModified: new Date(),
        },
      });
    } else {
      // For new posts, require slug and title.
      if (!slug || !title) {
        return new NextResponse(
          JSON.stringify({ message: "Missing required fields: slug and title are required." }),
          { status: 400 }
        );
      }
      // Create a new post
      post = await prisma.post.create({
        data: {
          slug,
          title,
          catSlug: category !== "Select A Category" ? `${category.toLowerCase()}` : "",
          desc: description,
          content: blogContent,
          readingTime,
          image,
          keywords,
          isDraft: draft,
        },
      });
    }

    // ----- MEDIA HANDLING LOGIC -----
    // If new media is provided, compare it with existing media
    let oldMedia = [];
    if (post.id) {
      // Fetch the existing media for this post
      oldMedia = await prisma.media.findMany({
        where: { postId: post.id },
      });
    }

    // Prepare maps/arrays to decide what to update/create/delete
    const newMediaMap = new Map(); // key: media id (if exists), value: media data
    const newMediaNoId = []; // new media items without an id

    // Loop over new media
    newMedia.forEach((m) => {
      if (m.id) {
        newMediaMap.set(m.id, m);
      } else {
        newMediaNoId.push(m);
      }
    });

    // Determine which media to update and delete
    const mediaToUpdate = [];
    oldMedia.forEach((old) => {
      if (newMediaMap.has(old.id)) {
        const newItem = newMediaMap.get(old.id);
        if (
          old.url !== newItem.url ||
          old.isThumbnail !== newItem.isThumbnail ||
          old.type !== newItem.type ||
          old.size !== newItem.size ||
          old.publicId !== newItem.publicId
        ) {
          mediaToUpdate.push({ id: old.id, data: newItem });
        }
        newMediaMap.delete(old.id);
      }
    });

    // The remaining items in newMediaMap and all items in newMediaNoId are new media
    const mediaToCreate = [...newMediaNoId, ...Array.from(newMediaMap.values())];

    

    // Process updates: update existing media records that have changed.
    for (const { id: mediaId, data } of mediaToUpdate) {
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          url: data.url,
          isThumbnail: data.isThumbnail || false,
          type: data.type || null,
          size: data.size || null,
          publicId: data.publicId,
        },
      });
    }

    // Process creations: create new media records for new items.
    if (mediaToCreate.length > 0) {
      await prisma.media.createMany({
        data: mediaToCreate.map((m) => ({
          url: m.url,
          isThumbnail: m.isThumbnail || false,
          type: m.type || null,
          size: m.size || null,
          publicId: m.publicId,
          postId: post.id,
        })),
      });
    }
    // ----- END MEDIA HANDLING -----

    return new NextResponse(
      JSON.stringify({
        message: "Draft saved successfully",
        post: {
          ...post,
          cat: post.cat?.title || "", // Send category name, fallback to empty string
          media: await prisma.media.findMany({ where: { postId: post.id } }), // Fetch media for response
        },
      }),
      { status: 200 }
    );
    
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went wrong" }),
      { status: 500 }
    );
  }
};
