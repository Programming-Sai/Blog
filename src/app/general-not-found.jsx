import React from 'react'
import styles from './not-found.module.css'
import Wrapper from '@/components/pagewrapper/Wrapper';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import RecentPosts from '@/components/recentposts/RecentPosts';
import PopularPosts from '@/components/popularposts/PopularPosts';
import Glow from '@/components/glow/Glow';



const GeneralNotFound = () => {
  return (
        <div>
            <div>
                <Navbar />
                <Wrapper>
                    <div className={styles.container} style={{zIndex: 1}}>
                        <h1>Oops ...Error 404 (Page Not Found)</h1>
                        <h3>This Is not the page you are looking for,</h3>
                        <Glow 
                            top='-10%' 
                            left='-15%' 
                            width={500} 
                            height={500} 
                            color='red'
                            mtop='-5%'
                            mleft='0%'
                        />
                        <div className={styles.flexWrapper}>
                            <RecentPosts className={styles.itemOne} />
                            <PopularPosts className={styles.itemTwo} glow={ true } borderRad='20px' marginBlock='0%' isOutline='2px'/>
                        </div>
                    </div>
                </Wrapper>
                <Footer />
            </div>
        </div>
  )
}

export default GeneralNotFound