'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './publishedblogs.module.css';
import { ThemeContext } from '@/context/ThemeContext'
import BlogTable from '@/components/blogtable/BlogTable';




const PublishedBlogs = () => {
  const { toggleSidePane } = useContext(ThemeContext);
  const blogData = [
    { id: 1, title: 'A Deep Dive into the World of Music', date: '01 Oct 2024', thumbnail: '/culture.png', category: 'Music', views: 150, comments: 5, shares: 10 },
    { id: 2, title: 'Top 10 Must-Watch Movies of 2024', date: '05 Oct 2024', thumbnail: '/travel.png', category: 'Movies', views: 0, comments: 2, shares: 4 },
    { id: 3, title: 'Exploring the Vibrant Lifestyle Trends in 2024', date: '07 Oct 2024', thumbnail: '/style.png', category: 'Lifestyle', views: 200, comments: 8, shares: 12 },
    { id: 4, title: 'Breaking News: What You Need to Know', date: '10 Oct 2024', thumbnail: '/coding.png', category: 'News', views: 0, comments: 3, shares: 5 },
    { id: 5, title: 'The Evolution of Sports in the Modern Age', date: '12 Oct 2024', thumbnail: '/culture.png', category: 'Sports', views: 300, comments: 7, shares: 15 },
    { id: 6, title: 'Fashion Forward: The Trends of Tomorrow', date: '15 Oct 2024', thumbnail: '/fashion.png', category: 'Lifestyle', views: 250, comments: 6, shares: 10 },
    { id: 7, title: 'Traveling the World: Cultural Insights', date: '18 Oct 2024', thumbnail: '/travel.png', category: 'Lifestyle', views: 0, comments: 4, shares: 8 },
    { id: 8, title: 'Coding for Beginners: Your First Steps', date: '20 Oct 2024', thumbnail: '/coding.png', category: 'News', views: 180, comments: 9, shares: 11 },
    { id: 9, title: 'The Future of Travel: Experiences to Embrace', date: '22 Oct 2024', thumbnail: '/travel.png', category: 'Lifestyle', views: 220, comments: 10, shares: 14 },
    { id: 10, title: 'The Importance of Breakfast: Fueling Your Day', date: '23 Oct 2024', thumbnail: '/food.png', category: 'Sports', views: 0, comments: 1, shares: 3 },
    { id: 11, title: 'Sustainable Eating: What You Need to Know', date: '24 Oct 2024', thumbnail: '/culture.png', category: 'Lifestyle', views: 310, comments: 12, shares: 20 },
    { id: 12, title: 'Understanding the Basics of Fashion', date: '25 Oct 2024', thumbnail: '/fashion.png', category: 'Lifestyle', views: 0, comments: 3, shares: 7 },
    { id: 13, title: 'Exploring Vegan Desserts: Sweet Treats', date: '26 Oct 2024', thumbnail: '/food.png', category: 'Lifestyle', views: 145, comments: 6, shares: 10 },
    { id: 14, title: 'Cooking for One: Easy and Delicious Meals', date: '27 Oct 2024', thumbnail: '/food.png', category: 'Lifestyle', views: 0, comments: 5, shares: 6 },
    { id: 15, title: 'Food Pairing: A Guide to Wine and Dine', date: '28 Oct 2024', thumbnail: '/food.png', category: 'Lifestyle', views: 275, comments: 8, shares: 14 },
    { id: 16, title: 'The Science Behind Cooking Techniques', date: '29 Oct 2024', thumbnail: '/food.png', category: 'Lifestyle', views: 0, comments: 4, shares: 7 },
    { id: 17, title: 'Fashion Trends to Watch in 2025', date: '30 Oct 2024', thumbnail: '/style.png', category: 'Lifestyle', views: 360, comments: 9, shares: 13 },
    { id: 18, title: 'Global Cuisines: An Introduction to Spices', date: '31 Oct 2024', thumbnail: '/food.png', category: 'Lifestyle', views: 0, comments: 5, shares: 9 },
    { id: 19, title: 'The Best Sports Moments of the Year', date: '01 Nov 2024', thumbnail: '/coding.png', category: 'Sports', views: 420, comments: 11, shares: 18 },
    { id: 20, title: 'Behind the Scenes: Movie Production Insights', date: '02 Nov 2024', thumbnail: '/style.png', category: 'Movies', views: 110, comments: 4, shares: 7 },
    { id: 21, title: 'Breaking the News: Global Events', date: '03 Nov 2024', thumbnail: '/culture.png', category: 'News', views: 190, comments: 6, shares: 10 },
    { id: 22, title: 'Lifestyle Hacks for a Better You', date: '04 Nov 2024', thumbnail: '/travel.png', category: 'Lifestyle', views: 275, comments: 9, shares: 16 },
    { id: 23, title: 'Music Genres: The Rising Stars', date: '05 Nov 2024', thumbnail: '/coding.png', category: 'Music', views: 130, comments: 5, shares: 9 },
    { id: 24, title: 'The Impact of Sports on Society', date: '06 Nov 2024', thumbnail: '/style.png', category: 'Sports', views: 340, comments: 10, shares: 17 },
    { id: 25, title: 'An Inside Look at 2025 Movie Releases', date: '07 Nov 2024', thumbnail: '/travel.png', category: 'Movies', views: 120, comments: 3, shares: 8 },
];

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

  useEffect(()=>{console.log("All posts: ", publishedPosts)}, [publishedPosts]);
  



  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px', zIndex:10} : {'--left': '250px', zIndex:10}}>
      <BlogTable data={publishedPosts} page='published' />
    </div>
  )
}

export default PublishedBlogs;
