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

const EditorOne = dynamic(() => import("@/components/editorone/EditorOne"), {ssr: false,});

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
          category: fetchedData.category || "Select A Category",
          blogContent: fetchedData.content || "",
          readingTime: fetchedData.readingTime || 0.0,
          date: fetchedData.lastModified || "",
          draft: fetchedData.draft ?? true,
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


  

 
 
 
 
  useEffect(()=>{ 
      setPreviewData((prev) => {
        const newData = { id: postId || prev.id , image, title, slug, category, blogContent, readingTime, date, draft, keywords, description, media };
        
        // Only update if data has actually changed
        return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
      }); 
    }, [postId  , image, title, slug, category, blogContent, readingTime, date, draft, keywords, description, media]);

 
 
   
 
  



  const handleTitleChange = (event) => {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
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

        <div 
          className={styles.endButton} 
          // onClick={saveBlogToDB}
        >
          <FontAwesomeIcon icon={faCloud} />
          Save to Cloud
        </div>

        <div
          className={styles.endButton}
          onClick={() => {
            setDraft((prev) => {
              const newDraft = !prev;
              // saveBlogToDB(newDraft); // ✅ Ensures it gets the latest value
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
          // onClick={clearAll}
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

