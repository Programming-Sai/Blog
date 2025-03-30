"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./editor.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useLocalStorage from "@/components/UseLocalStorage";
import DOMPurify from "dompurify";
import {faClapperboard, faClose, faCloud, faEye, faFileAlt, faSave, faTrash, faUpload,} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import BASE_PATH from "../../../../base"; 
import { TagInput } from "@/components/taginput/TagInput";
import { handleImageDelete, handleImageUpload } from "@/utils/imageHandler";
import { useRouter, useSearchParams } from "next/navigation";
import useUnsavedChangesWarning from "@/components/useUnsavedChangeWarning";

const ImageUploader = dynamic(() => import("@/components/imageuploader/ImageUploader"),{ssr: false,});

const DropDown = dynamic(() => import("@/components/dropdown/DropDown"), {ssr: false,});

const EditorThree = dynamic(() => import("@/components/editorthree/EditorThree"), {ssr: false,});







const Editor = () => {



  const {toggleSidePane, autoSaveDuration, autoSave, setAutoSave, quillTheme, setQuillTheme,} = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get initial editId from URL (if it exists)
  const initialEditId = searchParams.get("editId") || "";
  
  // Use initialEditId for postId if it exists; otherwise, start as empty string.
  const [postId, setPostId] = useState(initialEditId);
  

 // Initialize with existing values from localStorage
  const [previewData, setPreviewData] = useLocalStorage("previewData", { id: "", image: "", title: "", slug: "", category: "Select A Category", blogContent: "", readingTime: 0.0, date: "", draft: true, keywords: [],  description: "", media: [] });
 

   // If there's no postId from URL but localStorage has one, update state.
   useEffect(() => {
    if (!postId && previewData.id) {
      setPostId(previewData.id);
    }
  }, [previewData, postId]);




  // Fetch data from DB if there's a postId
  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      try {
        const response = await fetch(`/api/getPost?id=${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post data");

        const fetchedData = await response.json();

        if (!fetchedData) return;

        // Check if local storage already has different data
        if (previewData.id && previewData.id !== fetchedData.id) {
          const overwrite = confirm("A different post exists in local storage. Do you want to overwrite it?");
          if (!overwrite) return; // Keep local storage data if user declines
        }

        // Update local storage with fetched data
        setPreviewData({
          id: fetchedData.id,
          image: fetchedData.image || "",
          title: fetchedData.title || "",
          slug: fetchedData.slug || "",
          category: fetchedData?.catSlug.replace('/', '') || "Select A Category",
          blogContent: fetchedData.content || "",
          readingTime: fetchedData.readingTime || 0.0,
          date: fetchedData.lastModified || "",
          draft: fetchedData.isDraft ?? true,
          keywords: fetchedData.keywords || [],
          description: fetchedData.desc || "",
          media: fetchedData.media || [],
        });

      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]); // Runs when postId changes





  
  // Whenever postId changes, update the URL.
  useEffect(() => {
    if (postId) {
      console.log("Id for url update: ", postId)
      router.replace(`/admin/editor?editId=${postId}`, { scroll: false });
    }
  }, [postId, router]);
 
  
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Select A Category");
  const [blogContent, setBlogContent] = useState("");
  const [description, setDescription] = useState("");
  const [draft, setDraft] = useState(true);
  const [saved, setSaved] = useState(false);
  const [readingTime, setReadingTime] = useState(0.0);
  const [date, setDate] = useState(new Date());
  const [keywords, setKeywords] = useState([]);
  const [media, setMedia] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isSlugUnique, setIsSlugUnique] = useState(true);
  const [lastSavedData, setLastSavedData] = useState(previewData);



  useUnsavedChangesWarning(unsavedChanges, ()=>{console.log("There are some unsaved Changes and the editor knows!!!")})
  


  useEffect(() => {
    setUnsavedChanges(JSON.stringify(previewData) !== JSON.stringify(lastSavedData));
  }, [previewData]);

  

  useEffect(() => {
    if (!previewData) return;
  
    setImage(prev => prev === previewData.image ? prev : previewData.image);
    setTitle(prev => prev === previewData.title ? prev : previewData.title);
    setSlug(prev => prev === previewData.slug ? prev : previewData.slug);
    setCategory(prev => prev === previewData.category ? prev : previewData.category);
    setBlogContent(prev => prev === previewData.blogContent ? prev : previewData.blogContent);
    setDescription(prev => prev === previewData.description ? prev : previewData.description);
    setDraft(prev => prev === previewData.draft ? prev : previewData.draft);
    setReadingTime(prev => prev === previewData.readingTime ? prev : previewData.readingTime);
    setDate(prev => prev === previewData.date ? prev : previewData.date);
    setKeywords(prev => JSON.stringify(prev) === JSON.stringify(previewData.keywords) ? prev : previewData.keywords);
    setMedia(prev => JSON.stringify(prev) === JSON.stringify(previewData.media) ? prev : previewData.media);
  
  }, [previewData]);
  
 
 
//  Auto save draft...
  useEffect(() => {
    const timer = setTimeout(() => {
      const newData = { id: postId || previewData.id, image, title, slug, category, blogContent, readingTime, date, draft, keywords, description, media };
      setPreviewData(newData);
    }, autoSaveDuration); // Autosave after 1 second of inactivity
  
    return () => clearTimeout(timer);
  }, [postId, image, title, slug, category, blogContent, readingTime, date, draft, keywords, description, media]);
  
 
//  Manual Save Draft...
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // prevent the default "Save" browser behavior
        const newData = { id: postId || previewData.id, image, title, slug, category, blogContent, readingTime, date, draft, keywords, description, media };
        setPreviewData(newData);
        setSaved(true);
  
        setTimeout(() => {
          setSaved(false);
        }, 5000);
        // console.log("Autosave triggered via Ctrl+S");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [postId, image, title, slug, category, blogContent, readingTime, date, draft, keywords, description, media]);
  
   

  // A simple debounce helper function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const checkSlugUniqueness = async (slug, id = "", returns="") => {
    try {
      const queryString = id ? `?slug=${slug}&id=${id}` : `?slug=${slug}`;
      const res = await fetch(`/api/isSlugUnique${queryString}`);
      const { isUnique } = await res.json();
      if (returns){
        return isUnique;
      }else{
        setIsSlugUnique(isUnique);
      }
    } catch (error) {
      console.error("Error checking slug uniqueness:", error);
    }
  };

  useEffect(() => {
    const debouncedCheck = debounce(checkSlugUniqueness, 500);
    
    // Call with the slug and current postId (which will be empty for new posts)
    if (slug) {
      debouncedCheck(slug, postId);
    }
  }, [slug, postId]);
  




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
        id: data.post.id  || postId,
        image: data.post?.image || "",
        title: data.post?.title || "",
        slug: data.post?.slug || "",
        category: data.post?.catSlug.replace('/', '') || "", // Ensure cat is not null
        blogContent: data.post?.content || "",
        readingTime: data.post?.readingTime || 0.0,
        date: data.post?.lastModified || "",
        draft: data.post?.isDraft ?? true,
        keywords: data.post?.keywords || [],
        description: data.post?.desc || "",
        media: data.post?.media || [],
      };

     

      setPreviewData(formattedData);
      setPostId(data?.post?.id || previewData.id);
      router.replace(`/admin/editor?editId=${data?.post?.id}`, { scroll: false });

      
      console.log("New URL:", `/admin/editor?editId=${data?.post?.id}`);
      console.log("Current URL:", window.location.href);


      setSaved(true);
      setTimeout(() => setSaved(false), 5000);
      setLastSavedData(previewData);
      setUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };


 
const saveBlogToCloud = async (newDraft = draft) => { // ✅ Uses newDraft if provided
    newDraft = typeof newDraft === "boolean" ? newDraft : draft;
    
    const isSlugUnique = await checkSlugUniqueness(slug, postId, "uniqueness");

    if (!isSlugUnique){
      alert(`The Title "${title}" is not Unique. Please Change it before anything can be saved to the Cloud.`);
      return;
    }

    let cleanContent = DOMPurify.sanitize(blogContent, {
      FORBID_TAGS: ["script"],
      ADD_TAGS: ["iframe", "style"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src", "width", "height", "title"],
    });
  
    cleanContent = await processMediaUploads(cleanContent); // ✅ Upload & replace images
  
    const blogData = { id: postId || previewData.id, image, title, slug, category, blogContent: cleanContent?.toString(), readingTime, date, draft: newDraft, keywords, description, media };
    setPreviewData(blogData);
    await sendToDB(blogData);
  };




  
  
  


  const clearAll = () => { 
    setPreviewData({ id:"", image:"", title:"", slug:"", category:"Select A Category", blogContent:"", readingTime:0.0, date:"", draft:true, keywords:[], description:"", media:[] }); 
    setPostId(""); 
    router.replace("/admin/editor", { scroll: false }); 
  };


  
const calculateReadingTime = (blogContent) => {
  const wordsPerMinute = 200;
  const text = blogContent.replace(/<[^>]*>/g, ""); 
  const words = text.split(/\s+/).length;
  return parseFloat((words / wordsPerMinute).toFixed(1));
};




  



  const handleTitleChange = (event) => {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
    const generatedSlug = inputTitle
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(generatedSlug);
  };




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
        {/* <h1>{JSON.stringify(date)}</h1> */}
        <div className={styles.titleContainer}>
          <textarea
            onChange={handleTitleChange}
            value={title}
            placeholder="Title..."
            wrap="soft"
          />
          {!isSlugUnique && (
            <p style={{color:'red'}}>This title is already taken. Please choose another one.</p>
          )}
        </div>
        <div className={styles.imgContainer} style={{height:'350px'}}>
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <EditorThree
          blogContent={blogContent}
          setBlogContent={setBlogContent}
          setDescription={setDescription}
          extractTextFromBlog={extractTextFromBlog}
          calculateReadingTime={calculateReadingTime}
          setReadingTime={setReadingTime}
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

        <div 
          className={styles.endButton} 
          onClick={saveBlogToCloud}
        >
          <FontAwesomeIcon icon={faCloud} />
          Save to Cloud
        </div>

        <div
          className={styles.endButton}
          onClick={() => {
            setDraft((prev) => {
              const newDraft = !prev;
              saveBlogToCloud(newDraft); // ✅ Ensures it gets the latest value
              return newDraft;
            });
          }}          
        >
          <FontAwesomeIcon icon={faUpload} />
          {draft ? "Publish" : "Unpublish"}
        </div>
        <div
          className={styles.endButton}
          style={{backgroundColor:'rgba(255,0,0,0.5)'}} 
          onClick={clearAll}
        >
          <FontAwesomeIcon icon={faTrash}/>
          Clear All
        </div>
      </div>
      {saved && <div className={styles.indicator}>Saved</div>}
    </div>
  );
};

export default Editor;

