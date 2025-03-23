


export const handleImageUpload = async (file, folder = "blog_media") => {
    const formData = new FormData();
    formData.append("file", file);
    
    // Select the correct upload preset based on the folder
    const uploadPreset = folder === "thumbnails"
        ? process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_THUMBNAILS
        : process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_BLOG;
    
    formData.append("upload_preset", uploadPreset);

    formData.append("folder", folder); // Organize files in Cloudinary


    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error.message);

        return { url: data.secure_url, publicId: data.public_id };
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};





export const handleImageDelete = async (publicId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteMedia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Deletion failed");
      console.log("Image deleted successfully:", data);
      return data;
    } catch (error) {
      console.error("Delete failed:", error);
      throw error;
    }
  };
  