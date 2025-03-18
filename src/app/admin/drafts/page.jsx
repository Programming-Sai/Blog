'use client'
import React, { useContext, useState, useEffect } from 'react'
import styles from './drafts.module.css';
import { ThemeContext } from '@/context/ThemeContext'
import BlogTable from '@/components/blogtable/BlogTable';




const Drafts = () => {
  const { toggleSidePane } = useContext(ThemeContext);

  const [drafts, setDrafts] = useState([]);
  
    useEffect(()=>{
      const getData = async () => {
        try{
          const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/allPosts`);
          if (!result.ok){
            throw new Error("Failed to retrieve all Posts");
          }
          const data = await result.json();
  
          setDrafts(data.filter(post => post.isDraft));
  
          // setDrafts(data)
        }catch(error){
          console.log("An error occured when trying to fetch all posts: ", error)
        }
      }
      getData()
    }, [])
  
    useEffect(()=>{console.log("All posts: ", drafts)}, [drafts]);
    
  
  



  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px', zIndex:10} : {'--left': '250px', zIndex:10}}>
      <BlogTable data={drafts} page='draft' />
    </div>
  )
}

export default Drafts;
