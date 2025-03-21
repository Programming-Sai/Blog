import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req) {
  try {
    console.log("Received API Call: /api/uploadMedia");

    const { base64, folder = "blog_media" } = await req.json();
    if (!base64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Generate a unique public_id (optional)
    const publicId = `upload-${Date.now()}`;

    // Upload the image using unsigned upload preset
    const uploadedImage = await cloudinary.uploader.upload(base64, {
      folder,
      public_id: publicId,
      resource_type: "image",
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, // Use your preset here
    });

    return NextResponse.json({ url: uploadedImage.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
