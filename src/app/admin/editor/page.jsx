"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./editor.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useLocalStorage from "@/components/UseLocalStorage";
import DOMPurify from "dompurify";
import {faClapperboard, faClose, faEye, faFileAlt, faSave, faTrash, faUpload,} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import BASE_PATH from "../../../../base"; 
import { TagInput } from "@/components/taginput/TagInput";
import { handleImageDelete, handleImageUpload } from "@/utils/imageHandler";
import { useRouter, useSearchParams } from "next/navigation";
import useUnsavedChangesWarning from "@/components/useUnsavedChangeWarning";

const ImageUploader = dynamic(() => import("@/components/imageuploader/ImageUploader"),{ssr: false,});

const DropDown = dynamic(() => import("@/components/dropdown/DropDown"), {ssr: false,});

const EditorOne = dynamic(() => import("@/components/editorone/EditorOne"), {ssr: false,});

const EditorThree = dynamic(() => import("@/components/editorthree/EditorThree"), {ssr: false,});






const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};



const calculateReadingTime = (blogContent) => {
  const wordsPerMinute = 200;
  const text = blogContent.replace(/<[^>]*>/g, ""); 
  const words = text.split(/\s+/).length;
  return parseFloat((words / wordsPerMinute).toFixed(1));
};



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




const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};





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





const Editor = () => {

  const [isSlugUnique, setIsSlugUnique] = useState(true);

  

  const fetchSlugUniqueness = async (slug, id) => {
    if (!slug) return isSlugUnique;
    const res = await fetch(`/api/isSlugUnique?slug=${slug}&id=${id || ""}`);
    const { isUnique } = await res.json();
    setIsSlugUnique(isUnique);
    return isUnique;
  };


  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId") || "";
  
  
  
  const {toggleSidePane, autoSaveDuration, autoSave, setAutoSave, quillTheme, setQuillTheme,} = useContext(ThemeContext);
  
  
  const [postId, setPostId] = useState(editId);
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


  
  const checkSlug = debounce(fetchSlugUniqueness, 500);
  


  

  useEffect(() => {
    if (postId) {
      console.log("Fetching from DB By Post Id:", postId);
      const fetchPostData = async () => {
        try {
          const res = await fetch(`/api/getPost?id=${editId}`);
          if (!res.ok) throw new Error("Failed to fetch post");
          const post = await res.json();
          // Reset the preview data to what is fetched from the DB.
          // Also, update your postId state so it remains constant for later updates.
          setPreviewData({
            id: post.id, // Use the fetched id (should be equal to editId)
            image: post.image || "",
            title: post.title || "",
            slug: post.slug || "",
            category: post.catSlug || "Select A Category",
            blogContent: post.content || "",
            readingTime: post.readingTime || 0,
            date: post.createdAt || "",
            draft: post.isDraft ?? true,
            keywords: post.keywords || [],
            description: post.desc || "",
            media: post.media || [],
          });
          setPostId(post.id);
          // setTimeout(() => {
          //   router.replace(`/admin/editor?editId=${postId}`, { scroll: false });
          // }, 100);
        } catch (error) {
          console.error("Error fetching post:", error);
          // Optionally, fall back to localStorage previewData or defaults here.
        }
      };
      fetchPostData();
    } 
    // If no editId is provided, then we assume previewData is managed elsewhere.
  }, [postId]); // Fetch only when postId is set



  useEffect(()=>{
    if (postId) {
      console.log("Setting url....")
      setTimeout(() => {
        router.replace(`/admin/editor?editId=${postId}`, { scroll: false });
      }, 100);
      console.log("URL set.....")
    }
  }, [postId])




  
  // Use inside useEffect when slug updates
  useEffect(() => {
    if (slug) checkSlug(slug);
  }, [slug]);

  const handleTitleChange = (event) => {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
  };


  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip first render
      return;
    }
    setUnsavedChanges(true);
  }, [blogContent, slug, title, category, image, keywords]);




  const autoSaveDraft = async () => {
    const isUnique = await fetchSlugUniqueness(slug, postId);
    if (slug && !isUnique) {
      alert(`Title: ${title} is not unique. Choose another one.`);
      setPreviewData({
        id: postId,
        image,
        category,
        blogContent,
        readingTime,
        date,
        draft,
        keywords,
        description,
        media, 
      });
    }else{
      setPreviewData({
        id: postId,
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
      media, 
    });
    }
  
    
    setSaved(true);
  
    setTimeout(() => {
      setSaved(false);
    }, 5000);
  };



  const sendToDB = async (blogData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/savePost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
  
      if (!res.ok) {
        throw new Error(`Failed to save blog: ${res.text()}`);
      }
      const data = await res.json();
      // Assume the response returns the saved post data

      const formattedData = {
        // ...(data.post?.id ? { id: data.post.id } : {}),
        id: postId,
        image: data.post?.image || "",
        title: data.post?.title || "",
        slug: data.post?.slug || "",
        category: data.post?.catSlug.replace('/', '') || "", // Ensure cat is not null
        blogContent: data.post?.content || "",
        readingTime: data.post?.readingTime || 0,
        date: data.post?.createdAt || "",
        draft: data.post?.isDraft ?? true,
        keywords: data.post?.keywords || [],
        description: data.post?.desc || "",
        media: data.post?.media || [],
      };

      console.log("Returned Date: ", data?.post, "\n\nFormatted Data: ", formattedData)

      setPreviewData(formattedData);

      setTimeout(() => {
        router.replace(`/admin/editor?editId=${data?.post?.id}`, { scroll: false });
      }, 100);

      
      console.log("New URL:", `/admin/editor?editId=${data?.post?.id}`);
      console.log("Current URL:", window.location.href);


      setSaved(true);
      setTimeout(() => setSaved(false), 5000);
      setUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
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

      const { type, size } = file;

      // Optionally update your local media state array
      setMedia((prev) => [...prev, { url, publicId, type, size, isThumbnail: false }]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  // Replace each base64 string in your content with its uploaded URL
  return replaceBase64WithUrls(content, base64Map);
};


  
const saveBlogToDB = async (newDraft = draft) => { // ✅ Uses newDraft if provided
    newDraft = typeof newDraft === "boolean" ? newDraft : draft;
    
    console.log("Saved to DB after uploading Images.");
    console.log("MEDIA: ", media)

    let cleanContent = DOMPurify.sanitize(blogContent, {
      FORBID_TAGS: ["script"],
      ADD_TAGS: ["iframe", "style"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src", "width", "height", "title"],
    });
  
    cleanContent = await processMediaUploads(cleanContent); // ✅ Upload & replace images
  
    let blogData = {} ;

    const isUnique = await fetchSlugUniqueness(slug, postId);
    if (slug && !isUnique) {
       alert(`Title: ${title} is not unique. Choose another one.`);
       blogData = {
        id: postId,
        image,
        category,
        blogContent: cleanContent?.toString(),
        readingTime,
        date,
        draft: newDraft, // ✅ Uses the updated draft value
        keywords: Array.isArray(keywords) ? keywords : keywords.split(","),
        description,
        media, // ✅ Store media in local storage
      };
    } else{
       blogData = {
        id: postId,
        image,
        title,
        slug,
        category,
        blogContent: cleanContent?.toString(),
        readingTime,
        date,
        draft: newDraft, // ✅ Uses the updated draft value
        keywords: Array.isArray(keywords) ? keywords : keywords.split(","),
        description,
        media, // ✅ Store media in local storage
      };
    }

    Object.entries(blogData).forEach(([key, value]) => {
      console.log(`${key}:`, value, "Type:", typeof value);
    });
    
  
    await sendToDB(blogData);
  };


  useUnsavedChangesWarning(unsavedChanges, saveBlogToDB);

  




  

  const [previewData, setPreviewData] = useLocalStorage("previewData", {
    // Initialize with existing values from localStorage
    id:postId,
    image: "",
    title: "",
    slug: "",
    category: "Select A Category",
    blogContent: "",
    readingTime: 0,
    date: "",
    draft: true,
    keywords: [], // Ensure this is initialized properly
    description: "",
    media: [],
  });


  


  useEffect(() => {
    const savedData = previewData; // Automatically handled by the useLocalStorage hook
    setPostId(editId || savedData.id);
    setImage(savedData.image || "");
    setTitle(savedData.title || "");
    setSlug(savedData.slug || "");
    setCategory(savedData.category || "Select A Category");
    setBlogContent(savedData.blogContent || "");
    setReadingTime(savedData.readingTime || 0);
    setDate(savedData.date || "");
    setDraft(savedData.draft ?? true);
    setKeywords(savedData?.keywords || []);
    setDescription(savedData.description || "");
  }, [previewData]);






  const [isClearing, setIsClearing] = useState(false);

  const clearAll = () => {
    if (!confirm("Are you sure you want to clear everything? This action cannot be undone.")) {
      return;
    }
    // ✅ Remove editId from URL
    const url = new URL(window.location);
    url.searchParams.delete("editId");
    window.history.replaceState({}, "", url);
    setPostId('');
    setTitle('');
    setSlug('');
    setImage('');
    setCategory('Select A Category');
    setBlogContent('');
    setReadingTime(0);
    setDate(new Date().toISOString());
    setDraft(true);
    setKeywords([]);
    setDescription('');
    setMedia([]);
    
    console.log("Clearing Data.");
    setIsClearing(true); 

    
    setPreviewData({
      id: '',
      image: "",
      title: "",
      slug: "",
      category: "Select A Category",
      blogContent: "",
      readingTime: 0,
      date: "",
      draft: true,
      keywords: [],
      description: "",
      media: [],
    });
  
    
  };
  
  // ✅ Auto-save only when `clearAll` was triggered
  useEffect(() => {
    if (!isClearing) return; 
    autoSaveDraft();
    setIsClearing(false); // Reset flag to prevent infinite loops
  }, [previewData]);

  useEffect(()=>{console.log("BLOG DATA: ", previewData)}, [previewData])







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
    postId,
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
  }, [autoSave, autoSaveDuration, postId, image, title, slug, category, blogContent, readingTime, date, draft, keywords, description]);
  




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
          <TagInput keywords={keywords} setKeywords={setKeywords} />
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
          onClick={() => {
            setDraft((prev) => {
              const newDraft = !prev;
              saveBlogToDB(newDraft); // ✅ Ensures it gets the latest value
              return newDraft;
            });
          }}          
        >
          <FontAwesomeIcon icon={faUpload} />
          {draft ? "Publish" : "Unpublish"}
        </div>
        <div className={styles.endButton} style={{backgroundColor:'rgba(255,0,0,0.5)'}} onClick={clearAll}>
          <FontAwesomeIcon icon={faTrash}/>
          Clear All
        </div>
      </div>
      {saved && <div className={styles.indicator}>Saved</div>}
    </div>
  );
};

export default Editor;

// Make sure that the title for each blog is unique, ir at least the slug is.
