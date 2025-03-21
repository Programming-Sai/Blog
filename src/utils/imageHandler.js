export const handleImageUpload = async (file, folder = "blog_media") => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const res = await fetch("/api/uploadMedia", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ base64: reader.result, folder }),
          });
  
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          resolve(data.url);
        } catch (error) {
          console.error("Upload failed:", error);
          reject(error);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  



export const handleImageDelete = async (publicId) => {
    try {
        const res = await fetch(`/api/deleteMedia`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error.message);
        console.log("Image deleted successfully");
    } catch (error) {
        console.error("Delete failed:", error);
        throw error;
    }
};
