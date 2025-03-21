"use client";
import React, { useContext, useState, useEffect } from "react";
import styles from "./editor.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useLocalStorage from "@/components/UseLocalStorage";
import DOMPurify from "dompurify";
import {
  faClose,
  faEye,
  faFileAlt,
  faSave,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import BASE_PATH from "../../../../base"; 
import { TagInput } from "@/components/taginput/TagInput";
import { handleImageDelete, handleImageUpload } from "@/utils/imageHandler";
import { useRouter } from "next/navigation";
import useUnsavedChangesWarning from "@/components/useUnsavedChangeWarning";
const ImageUploader = dynamic(
  () => import("@/components/imageuploader/ImageUploader"),
  {
    ssr: false,
  }
);
const DropDown = dynamic(() => import("@/components/dropdown/DropDown"), {
  ssr: false,
});
const EditorOne = dynamic(() => import("@/components/editorone/EditorOne"), {
  ssr: false,
});

const EditorThree = dynamic(() => import("@/components/editorthree/EditorThree"), {
  ssr: false,
});






const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};




const calculateReadingTime = (blogContent) => {
  const wordsPerMinute = 200; // Average reading speed
  const text = blogContent.replace(/<[^>]*>/g, ""); // Remove any HTML tags
  const words = text.split(/\s+/).length; // Count words
  const readingTime = (words / wordsPerMinute).toFixed(1);
  return `${readingTime}min read`;
};



const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Editor = () => {
  const extractTextFromBlog = (content) => {
    // Check if the code is running in a browser environment
    if (typeof window !== "undefined") {
      // Create a new DOMParser instance
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");

      // Extract the text content from the parsed document
      return doc.body.textContent || "";
    }

    // Return an empty string or handle the case where it's not in a browser
    return "";
  };

  const {
    toggleSidePane,
    autoSaveDuration,
    autoSave,
    setAutoSave,
    quillTheme,
    setQuillTheme,
  } = useContext(ThemeContext);
  
  
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Select A Category");
  const [blogContent, setBlogContent] = useState("");
  const [description, setDescription] = useState("");
  const [draft, setDraft] = useState(true);
  const [saved, setSaved] = useState(false);
  const [readingTime, setReadingTime] = useState(calculateReadingTime(blogContent));
  const [date, setDate] = useState(getCurrentDate());
  const [keywords, setKeywords] = useState([]);
  const [media, setMedia] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [isSlugUnique, setIsSlugUnique] = useState(true);

  const fetchSlugUniqueness = async (slug) => {
    if (!slug) return isSlugUnique;
    const res = await fetch(`/api/isSlugUnique?slug=${slug}`);
    const { exists } = await res.json();
    setIsSlugUnique(!exists);
    return !exists;
  };
  
  const checkSlug = debounce(fetchSlugUniqueness, 500);
  
  
  // Use inside useEffect when slug updates
  useEffect(() => {
    if (slug) checkSlug(slug);
  }, [slug]);

  const handleTitleChange = (event) => {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
  };


  useEffect(() => {
    setUnsavedChanges(true);
  }, [blogContent, slug, title, category, image, keywords ,]);



  const extractBase64Images = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    
    const images = [];
    tempDiv.querySelectorAll("img").forEach((img) => {
      const src = img.src;
      if (src.startsWith("data:image/")) {
        images.push(src);
      }
    });
  
    return images;
  };

  
  const replaceBase64WithUrls = (content, base64Map) => {
    let updatedContent = content;
    
    Object.entries(base64Map).forEach(([base64, url]) => {
      updatedContent = updatedContent.replace(base64, url);
    });
  
    return updatedContent;
  };


  const dataURLtoFile = (dataUrl) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `upload-${Date.now()}`, { type: mime });
  };
  

  
  const processMediaUploads = async (content) => {
    const base64Images = extractBase64Images(content);
    const base64Map = {};
  
    // For each base64 image, convert to a File and upload it via handleImageUpload
    for (let base64 of base64Images) {
      try {
        // Convert the base64 string to a File object
        const file = dataURLtoFile(base64);
        // Upload the file using the refactored handleImageUpload function
        const { url, publicId } = await handleImageUpload(file, "blog_media");
        // Store the mapping from base64 to Cloudinary URL so you can replace it in the content
        base64Map[base64] = url;
  
        // Optionally update your local media state array
        setMedia((prev) => [...prev, { url, publicId }]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  
    // Replace each base64 string in your content with its uploaded URL
    return replaceBase64WithUrls(content, base64Map);
  };
  
  


  const autoSaveDraft = async () => {
    const isUnique = await fetchSlugUniqueness(slug);
    if (slug && !isUnique) {
      alert(`Title: ${title} is not unique. Choose another one.`);
      setPreviewData({
        image,
        category,
        blogContent,
        readingTime,
        date,
        draft,
        keywords,
        description,
        media, // ✅ Store media in local storage
      });
    }else{
      setPreviewData({
      image,
      title,
      slug,
      category,
      blogContent,
      readingTime,
      date,
      draft,
      keywords,
      description,
      media, // ✅ Store media in local storage
    });
    }
  
    
    setSaved(true);
  
    setTimeout(() => {
      setSaved(false);
    }, 5000);
  };
  
 
  
  const saveBlogToDB = async () => {
    console.log("Saved to DB after uploading Images.");
    console.log("MEDIA: ", media)

    let cleanContent = DOMPurify.sanitize(blogContent, {
      FORBID_TAGS: ["script"],
      ADD_TAGS: ["iframe", "style"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src", "width", "height", "title"],
    });
  
    cleanContent = await processMediaUploads(cleanContent); // ✅ Upload & replace images
  
    let blogData = {} ;

    const isUnique = await fetchSlugUniqueness(slug);
    if (!isUnique) {
       alert(`Title: ${title} is not unique. Choose another one.`);
       blogData = {
        image,
        category,
        blogContent: cleanContent,
        readingTime,
        date,
        draft,
        keywords: Array.isArray(keywords) ? keywords : keywords.split(","),
        description,
        media, // ✅ Store media in local storage
      };
    } else{
       blogData = {
        image,
        title,
        slug,
        category,
        blogContent: cleanContent,
        readingTime,
        date,
        draft,
        keywords: Array.isArray(keywords) ? keywords : keywords.split(","),
        description,
        media, // ✅ Store media in local storage
      };
    }
  
    setPreviewData(blogData);
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
    setUnsavedChanges(false);
  };


  useUnsavedChangesWarning(unsavedChanges, ()=>{console.log("SAving in progress..."); setUnsavedChanges(false)});

  



  const router = useRouter();
  const { editId } = router.query || ''; // Get the ID from the URL
  
  useEffect(() => {
    if (!editId) return; // New post, no need to fetch
  
    const fetchPostData = async () => {
      try {
        const res = await fetch(`/api/getPost?id=${editId}`); // Fetch by ID
        if (!res.ok) throw new Error("Failed to fetch post");
  
        const post = await res.json();
  
        // ✅ Ensure slug is set if available
        if (post.slug) setSlug(post.slug);
  
        // ✅ Save fetched data in local storage for editing
        setPreviewData({
          id: post.id, // ✅ Store the ID
          image: post.image || "",
          title: post.title || "",
          slug: post.slug || "",
          category: post.category || "Select A Category",
          blogContent: post.blogContent || "",
          readingTime: post.readingTime || "",
          date: post.date || "",
          draft: post.draft ?? true,
          keywords: post.keywords || [],
          description: post.description || "",
          media: post.media || [],
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
  
    fetchPostData();
  }, [editId]); // Watches the URL ID
  

  const [previewData, setPreviewData] = useLocalStorage("previewData", {
    // Initialize with existing values from localStorage
    image: "",
    title: "",
    slug: "",
    category: "Select A Category",
    blogContent: "",
    readingTime: "",
    date: "",
    draft: true,
    keywords: [], // Ensure this is initialized properly
    description: "",
    media: [],
  });


  


  useEffect(() => {
    const savedData = previewData; // Automatically handled by the useLocalStorage hook
    setImage(savedData.image || "");
    setTitle(savedData.title || "");
    setSlug(savedData.slug || "");
    setCategory(savedData.category || "Select A Category");
    setBlogContent(savedData.blogContent || "");
    setReadingTime(savedData.readingTime || "");
    setDate(savedData.date || "");
    setDraft(savedData.draft || true);
    setKeywords(savedData.keywords || []);
    setDescription(savedData.description || "");
  }, [previewData]);




  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "y") {
          e.preventDefault();
          window.open(`${BASE_PATH}/preview/${slug || "0-1-2-3-4-5-6-7-8-9"}`, "_blank");
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [slug]);

  useEffect(() => {
    const handleReadingTimeDateDescripttion = debounce(() => {
      setReadingTime(calculateReadingTime(blogContent));
      setDate(getCurrentDate());
      setDescription(extractTextFromBlog(blogContent));
    }, 300);

    handleReadingTimeDateDescripttion();
    return () => clearTimeout(handleReadingTimeDateDescripttion);
  }, [blogContent]);



  useEffect(() => {
    const handleSaveShortcut = async (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        await autoSaveDraft(); 
        // await saveBlog(); 
      }
    };
    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [
    image,
    title,
    slug,
    category,
    blogContent,
    readingTime,
    date,
    draft,
    keywords,
    description,
  ]);

  

  const [localStorageAutoSave, setLocalStorageAutoSave] = useLocalStorage("autoSave", "");
  // const [localStorageAutoSaveDuration, setLocalStorageAutoSaveDuration] = useLocalStorage("autoSaveDuration", "");


  
  
  useEffect(() => {
    let interval;
    setLocalStorageAutoSave(autoSave);
    if (autoSave) {
      // console.log("Starting Auto Save...");
      interval = setInterval(async () => {
        // console.log("Calling Auto save");
        await autoSaveDraft();
      }, autoSaveDuration);
    }
  
    return () => {
      // console.log("Clearing Auto Save Interval");
      if (interval) clearInterval(interval);
    };
  }, [autoSave, autoSaveDuration, image, title, slug, category, blogContent, readingTime, date, draft, keywords, description]);
  




  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(generatedSlug);
  }, [title]);

  const [lsQuillTheme, setLsQuillTheme] = useLocalStorage("quillTheme", "");
  
  
  useEffect(() => {
    if (lsQuillTheme) {
      setQuillTheme(lsQuillTheme);
    }
  }, []);

  return (
    <div
      className={`${styles.container} ${toggleSidePane ? styles.active : ""}`}
      style={
        toggleSidePane
          ? { "--left": "80px", zIndex: 10 }
          : { "--left": "250px", zIndex: 10 }
      }
    >
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <textarea
            onChange={handleTitleChange}
            value={title}
            placeholder="Title..."
            wrap="soft"
          />
        </div>
        <div className={styles.imgContainer}>
          <ImageUploader image={image} setImage={setImage} media={media} setMedia={setMedia} />
          {image && (
            <div
              className={styles.close}
              onClick={async () => {
                if (image) {
                  await handleImageDelete(image);
                  setImage(null);
                }
              }}
            >
              <FontAwesomeIcon icon={faClose} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.topContent}>
          <DropDown
            className={styles.dropDownSelector}
            category={category}
            setCategory={setCategory}
          />
          <button
            className={styles.toggleThemeButton}
            onClick={() => {
              setQuillTheme((prev) => (prev === "snow" ? "bubble" : "snow"));
            }}
          >
            {quillTheme} Editor Theme
          </button>
        </div>
        {/* <EditorOne
          blogContent={blogContent}
          setBlogContent={setBlogContent}
          quillTheme={quillTheme}
        /> */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* <EditorTwo blogContent={blogContent} setBlogContent={setBlogContent}/> */}
        <EditorThree
          blogContent={blogContent}
          setBlogContent={setBlogContent}
          quillTheme={quillTheme}
        />
       
        <div className={styles.keywordsContainer}>
          <TagInput setKeywords={setKeywords} />
        </div>               
      </div>
      <div className={styles.buttons}>
        <div className={styles.endButton}>
          <Link
            className={styles.firstIcon}
            href={`/preview/${slug || "0-1-2-3-4-5-5-6-7-8-9"}`}
            target="_blank"
          >
            <FontAwesomeIcon icon={faEye} />
            Preview
          </Link>
        </div>

        <div
          className={styles.endButton}
          onClick={() => {
            setAutoSave(!autoSave);
          }}
        >
          <FontAwesomeIcon icon={faSave} />
          {autoSave ? "Disable" : "Enable"} Auto Save
        </div>

        <div className={styles.endButton} onClick={saveBlogToDB}>
          <FontAwesomeIcon icon={faFileAlt} />
          Save As Draft
        </div>

        <div
          className={styles.endButton}
          onClick={() => setDraft((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faUpload} />
          {draft ? "Publish" : "Unpublish"}
        </div>
      </div>
      {saved && <div className={styles.indicator}>Saved</div>}
    </div>
  );
};

export default Editor;

// Make sure that the title for each blog is unique, ir at least the slug is.
