'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './publishedblogs.module.css';
import { ThemeContext } from '@/context/ThemeContext'
import BlogTable from '@/components/blogtable/BlogTable';




const PublishedBlogs = () => {
  const { toggleSidePane } = useContext(ThemeContext);
  const [publishedPosts, setPublishedPosts] = useState([]);

  useEffect(()=>{
    const getData = async () => {
      try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/allPosts`);
        if (!result.ok){
          throw new Error("Failed to retrieve all Posts");
        }
        const data = await result.json();

        setPublishedPosts(data.filter(post => !post.isDraft));

        // setPublishedPosts(data)
      }catch(error){
        console.log("An error occured when trying to fetch all posts: ", error)
      }
    }
    getData()
  }, [])

  



  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px', zIndex:10} : {'--left': '250px', zIndex:10}}>
      <BlogTable data={publishedPosts} page='published' />
    </div>
  )
}

export default PublishedBlogs;
