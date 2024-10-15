import React from 'react'
import styles from './blogpage.module.css';
import RecentPosts from '@/components/recentposts/RecentPosts';
import PopularPosts from '@/components/popularposts/PopularPosts';
import Pagination from '@/components/pagination/Pagination';
import Wrapper from '@/components/pagewrapper/Wrapper';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';


const BlogCategory = ({ slug }) => {
  return (
    <>
        <Navbar />
        <Wrapper>
            <div className={styles.container} style={{zIndex: 1}}>
                <h1 className={styles.title}>{ slug } Related Blogs</h1>
                <div className={styles.content}>
                    <div className={styles.blog}>
                        <RecentPosts className={styles.itemOne} />
                        <Pagination width={'100%'} className={styles.button}/>
                    </div>
                    <PopularPosts className={styles.itemTwo} />
                </div>
            </div>
        </Wrapper>
        <Footer />
    </>
    
  )

}

export default BlogCategory
