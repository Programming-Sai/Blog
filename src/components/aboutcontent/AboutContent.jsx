import React from 'react'
import styles from './aboutcontent.module.css';
import Glow from '../glow/Glow';

const AboutContent = ({ className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <Glow
        top='0%' 
        left='0%' 
        width={500} 
        height={500} 
        color='gold'
        mtop='50%'
        mleft='0%'
      />
      <h3>About [Blog Name]</h3>
      <p>
        Welcome to <b>[Blog Name]!</b> This is a hub for all things exciting, insightful, and up-to-date, bringing together a diverse community of readers who love staying informed and entertained.
      </p>

      <h4>Our Mission</h4>
      <p>
        At [Blog Name], our mission is to deliver fresh perspectives and high-quality content across a range of popular topics. We’re here to keep you updated, inspired, and connected to the latest happenings in the world of <em>sports</em>, <em>news</em>, <em>lifestyle</em>, <em>music</em>, and <em>movies</em>.
      </p>
      
      <h4>Our Vision</h4>
      <p>
        [Blog Name] envisions a world where everyone has access to trustworthy and inspiring information, right at their fingertips. Our vision is to empower readers through content that not only informs but also drives personal growth, entertainment, and community connection.
      </p>
      
      <p>
        Every individual deserves a source of credible and accessible news that enhances their life, knowledge, and well-being. Through engaging articles, helpful insights, and interactive discussions, [Blog Name] is dedicated to building a community that values accuracy, depth, and inspiration in every story.
      </p>

      <h4>What You’ll Find Here</h4>
      <p>Explore our five main categories, each offering a unique take on what’s happening in today’s world:</p>
      <ul>
        <li><b>Sports</b> – <span>From game highlights to player profiles and in-depth analyses, stay on top of your favorite teams, leagues, and sporting events.</span></li>
        <li><b>News</b> – <span>Covering current events, industry trends, and in-depth reporting, this section keeps you informed on essential updates and stories worldwide.</span></li>
        <li><b>Lifestyle</b> – <span>From wellness tips to fashion trends, travel guides, and personal growth insights, our lifestyle section is your go-to for living your best life.</span></li>
        <li><b>Music</b> – <span>Discover the latest music releases, artist profiles, and insights into the world of sound and culture.</span></li>
        <li><b>Movies</b> – <span>Dive into film reviews, behind-the-scenes stories, and discussions on cinema classics and new releases alike.</span></li>
      </ul>

      <h4>Meet the Blogger</h4>
      <p>
        Hi, I’m <b>[Blogger’s Name]</b>, the person behind <b>[Blog Name]</b>! I created this space to share my passions for all things <em>sports</em>, <em>news</em>, <em>lifestyle</em>, <em>music</em>, and <em>movies</em>. I believe in keeping things fresh, engaging, and insightful. Whether you’re here to stay updated, explore new topics, or just enjoy a good read, I’m thrilled to have you as part of this growing community.
      </p>

      <h4>Stay Connected</h4>
      <p>
        Let’s keep the conversation going! Feel free to connect with us on [social media links], or sign up for our newsletter to get updates delivered straight to your inbox.
      </p>

      <h4>Our Aim</h4>
      <p>
        [Blog Name] aims to be more than just a blog; it’s a digital platform that seeks to educate, empower, and inspire. If it doesn’t inform, entertain, or contribute to your life, it’s not on [Blog Name]. By consistently delivering quality content, we hope to make a meaningful impact on each reader’s journey, providing them with tools, ideas, and inspiration to enrich their daily lives.
      </p>
      
      <p> Thank you for stopping by – let’s explore, learn, and grow together at [Blog Name]!</p>
    </div>
  )
}

export default AboutContent;
