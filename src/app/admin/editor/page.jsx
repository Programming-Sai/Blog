'use client';
import React, { useContext, useState, useEffect } from 'react';
import styles from './editor.module.css';
import { ThemeContext } from '@/context/ThemeContext';
import ImageUploader from '@/components/imageuploader/ImageUploader';
import DropDown from '@/components/dropdown/DropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faFileAlt, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import EditorOne from '@/components/editorone/EditorOne';
import EditorTwo from '@/components/editortwo/EditorTwo';


const extractTextFromBlog = (content) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content; 
  const textContent = tempDiv.innerText || ''; 
  return textContent.replace(/\n/g, ' '); 
};



const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
  });
};

const calculateReadingTime = (blogContent) => {
  const wordsPerMinute = 200;  // Average reading speed
  const text = blogContent.replace(/<[^>]*>/g, '');  // Remove any HTML tags
  const words = text.split(/\s+/).length;  // Count words
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

  
  const { toggleSidePane, autoSaveDuration, autoSave, setAutoSave, quillTheme, setQuillTheme } = useContext(ThemeContext);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Select A Category');
  const [blogContent, setBlogContent] = useState('');
  const [description, setDescription] = useState('');
  const [draft, setDraft] = useState(true);  
  const [saved, setSaved] = useState(false);  
  const [readingTime, setReadingTime] = useState(calculateReadingTime(blogContent));
  const [date, setDate] = useState(getCurrentDate());
  const [keywords, setKeywords] = useState('');
    


const handleTitleChange = (event) => {
  const inputTitle = event.target.value;
  setTitle(inputTitle);
};


  const saveBlog = () => {
    const blogData = {
      image,
      title,
      slug,
      category,
      blogContent,
      readingTime, 
      date, 
      draft,
      keywords: (typeof keywords === 'string' ? keywords.split(',').map(keyword => keyword.trim()) : []),
      description,
      comments:0,
      views:0,
      shares:0,
    };
    
    localStorage.setItem('previewData', JSON.stringify(blogData));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 5000);
  };





  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('previewData')) || {};
    setImage(savedData.image || '');
    setTitle(savedData.title || '');
    setSlug(savedData.slug || '');
    setCategory(savedData.category || 'Select A Category');
    setBlogContent(savedData.blogContent || '');
    setReadingTime(savedData.readingTime || '');
    setDate(savedData.date || '');
    setDraft(savedData.draft || true);
    setKeywords(savedData.keywords || []);
    setDescription(savedData.description || '');
  }, []);
    

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Example combination: Ctrl + Shift + Y (you can choose any combination)
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        window.open(`/preview/${slug || 'preview'}`, '_blank');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    const handleSaveShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        saveBlog();
      }
    };
    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [image, title, slug, category, blogContent, readingTime, date, draft, keywords, description]); 


  useEffect(() => {
    let interval;
    localStorage.setItem('autoSave', JSON.stringify(autoSave));
    if (autoSave) {
      interval = setInterval(() => {
        saveBlog()
      }, autoSaveDuration);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoSave, autoSaveDuration, image, title, slug, category, blogContent, readingTime, date, draft, keywords, description]); 
  

  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .trim()  
      .replace(/\s+/g, '-')  
      .replace(/[^\w-]+/g, ''); 
    setSlug(generatedSlug);
  }, [title]); 


  useEffect(() => {
    const savedTheme = localStorage.getItem('quillTheme');
    if (savedTheme) {
      setQuillTheme(savedTheme);
    }
  }, []);
  
  



  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px', zIndex: 10} : {'--left': '250px', zIndex: 10}}>
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <textarea onChange={handleTitleChange} value={ title } placeholder='Title...' wrap="soft" />

        </div>
        <div className={styles.imgContainer}>
          <ImageUploader image={ image } setImage={ setImage } /> 
          { image && ( <div className={styles.close} onClick={()=>{setImage(null)}}><FontAwesomeIcon icon={ faClose }/></div> ) }
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.topContent}>
          <DropDown className={styles.dropDownSelector} category={ category } setCategory={ setCategory } />
          <button className={styles.toggleThemeButton} onClick={()=>{ setQuillTheme((prev)=>( prev === 'snow' ? 'bubble' : 'snow' ) )}}>
            { quillTheme } Editor Theme
          </button>
        </div>
        <EditorOne blogContent={blogContent} setBlogContent={setBlogContent} quillTheme={quillTheme}/>
        {/* <EditorTwo blogContent={blogContent} setBlogContent={setBlogContent}/> */}
        <div className={styles.keywordsContainer}>
          <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Enter keywords separated by commas..." />
        </div>
      </div>
      <div className={styles.buttons}>

        <div className={styles.endButton}>
          <Link className={styles.firstIcon} href={`/preview/${slug || 'preview'}`} target="_blank"> 
            <FontAwesomeIcon icon={ faEye }/>
            Preview
          </Link>
        </div>

        <div className={styles.endButton} onClick={()=>{setAutoSave(!autoSave)}}>
          <FontAwesomeIcon icon={ faSave }/>
          { autoSave ? 'Disable' : 'Enable' } Auto Save
        </div>

        <div className={styles.endButton} onClick={saveBlog}>
          <FontAwesomeIcon icon={ faFileAlt }/>
          Save As Draft
        </div>

        <div className={styles.endButton} onClick={() => setDraft((prev) => !prev)}>
            <FontAwesomeIcon icon={ faUpload }/>
            {draft ? 'Publish' : 'Unpublish'}
        </div>

      </div>
      {saved && (<div className={styles.indicator}>Saved</div>)}
    </div>
  );
}

export default Editor;



// TODO: 1. Work on editor height on mobile devices
//       2. Add some logic to take you from the top to the bottom. (Optional)