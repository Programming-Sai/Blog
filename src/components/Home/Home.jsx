import React from 'react';
import FeaturedSection from "@/components/featuredsection/FeaturedSection";
import EditorPick from '../editorpick/EditorPick';
import PopularTags from '../populartags/PopularTags';
import RecentPosts from '../recentposts/RecentPosts';
import PopularPosts from '../popularposts/PopularPosts';
import styles from './home.module.css';
import Pagination from '../pagination/Pagination';


export default function Home({ theme }) {

  return(
    <div>
      <FeaturedSection theme={ theme }/>
      <EditorPick />
      <PopularTags />
      <div className={styles.lower}>
          <RecentPosts  className={styles.itemOne}/>
          <PopularPosts  className={styles.itemTwo}/>
      </div>
      <Pagination />
    </div>
    );
}
