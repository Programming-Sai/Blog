import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

 

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // not NEXT_PUBLIC_*
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // secure: true,
});
export async function POST(request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ message: "publicId is required" }, { status: 400 });
    }

    // Delete the image using the publicId
    const result = await cloudinary.v2.uploader.destroy(publicId, { invalidate: true });

    // Optionally, you might want to check if the deletion was successful
    if (result.result !== "ok") {
      return NextResponse.json({ message: "Image deletion failed", result }, { status: 500 });
    }

    return NextResponse.json({ message: "Image deleted successfully", result }, { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { message: "Something went terribly wrong" },
      { status: 500 }
    );
  }
}
