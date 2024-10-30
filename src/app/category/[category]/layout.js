import { notFound } from 'next/navigation';
import styles from './category.module.css';
import RecentPosts from '@/components/recentposts/RecentPosts';
import PopularPosts from '@/components/popularposts/PopularPosts';
import Pagination from '@/components/pagination/Pagination';
import Wrapper from '@/components/pagewrapper/Wrapper';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const validCategories = {
  sports: { color: 'green' },
  news: { color: 'red' },
  lifestyle: { color: 'yellow' },
  music: { color: '#CC00FF' },
  movies: { color: 'lightblue' },
};

const BlogCategoryLayout = ({ children, params }) => {
  const { category } = params;

  // Normalize category to lowercase to ensure consistency with validCategories
  const normalizedCategory = category.toLowerCase();

  // Check if the category is valid
  if (!(normalizedCategory in validCategories)) {
    return notFound(); // This will render the 404 page
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className={styles.container}>
          <h1 className={styles.title} style={{'--bg-color':validCategories[normalizedCategory].color}}>{normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1)} Related Blogs</h1>
          <div className={styles.content}>
            <div className={styles.blog}>
              <RecentPosts className={styles.itemOne} />
              <Pagination width={'100%'} className={styles.button} />
            </div>
            <PopularPosts className={styles.itemTwo} borderRad='20px' marginBlock='5%' isOutline='2px' />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default BlogCategoryLayout;
