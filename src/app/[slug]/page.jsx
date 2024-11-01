import React from "react";
import styles from "./singleblogpage.module.css";
import PopularPosts from "@/components/popularposts/PopularPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import WriteComment from "@/components/writecomment/WriteComment";
import CommentSection from "@/components/commentsection/CommentSection";
import Pagination from "@/components/pagination/Pagination";
import Glow from "@/components/glow/Glow";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BASE_PATH from "../../../base";

// Temporary slugs for development purposes
const temporarySlugs = [
  "understanding-react-hooks",
  "css-grid-layout-guide",
  "building-a-nextjs-blog",
  "introduction-to-typescript",
  "optimizing-performance-in-react",
];

export async function generateStaticParams() {
  return temporarySlugs.map((slug) => ({
    slug, // This will match the [slug] parameter in the URL
  }));
}

const SingleBlogPage = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.item}>
              <Glow
                top="50%"
                left="-20%"
                width={500}
                height={500}
                color="#11F027"
                mtop="300%"
                mleft="-10%"
              />
              <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
              <div className={styles.postDetails}>
                <p className={styles.date}>25 Nov 2025</p>-
                <p className={styles.time}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>3min read</p>
                </p>
                -<p className={styles.tag}>LIFESTYLE</p>
              </div>
            </div>
            <div
              className={styles.item}
              style={{ "--img": `url("${BASE_PATH}/fashion.png")` }}
            >
              <Image
                fill
                alt="f"
                src={`${BASE_PATH}/fashion.png`}
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <div className={styles.blogPost}>
                <Glow
                  top="20%"
                  left="50%"
                  width={500}
                  height={500}
                  color="#00A3FF"
                  mtop="90%"
                  mleft="-10%"
                />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                itaque ipsam iste ea ipsa, tempore voluptate molestiae
                reprehenderit inventore nostrum, dignissimos, asperiores unde
                similique ipsum dicta est quia nesciunt? Cumque, ab consequuntur
                rem voluptatem, sapiente cupiditate corrupti nemo similique esse
                totam quos labore maxime perspiciatis molestiae! Ad, veniam
                quam! Non incidunt, praesentium minima minus eos corporis
                soluta, quas assumenda cumque dolorum iusto at quo, doloremque
                ad perferendis accusamus architecto cupiditate ducimus. Iusto
                rerum magnam quam libero qui, explicabo dolores dolore similique
                odio exercitationem molestiae voluptates. Sequi illum ipsam
                similique aperiam minima ea, temporibus aliquam laboriosam
                voluptate assumenda enim delectus consectetur inventore non
                magni placeat quidem reiciendis aspernatur natus omnis optio.
                Exercitationem adipisci quaerat ipsam rerum tenetur commodi
                iusto quos quidem. Odio labore doloribus fugit illum asperiores
                officiis pariatur quo sit perferendis corrupti repudiandae, aut
                dolorum sequi unde dicta deserunt dolorem laborum natus eos!
                Consectetur, hic ad, culpa, dolorem repellendus at quibusdam
                dicta numquam quisquam repellat eum saepe? Reprehenderit impedit
                temporibus nam, quia odit blanditiis quibusdam doloremque
                reiciendis in. Possimus officiis consequuntur, provident ad
                perspiciatis earum voluptatem numquam impedit tenetur laborum
                id, eius dolorem similique a soluta sed quidem pariatur. Quia
                expedita nisi, ad distinctio omnis quis debitis optio dolorem?
                Quos, a provident. Officiis, a rem fuga, sed odit, ipsum ex
                voluptatem porro dicta nulla illo. Similique minus voluptates,
                corporis voluptatibus odio officiis accusamus dolorem deleniti?
                Modi quam porro vitae deleniti commodi rem similique adipisci
                error. Dolor molestias voluptate expedita, quasi corporis hic
                harum eveniet aliquam placeat similique quaerat voluptas quas
                delectus impedit. Maiores fugiat architecto minima repellat
                numquam consequatur quos eaque corporis quaerat! Obcaecati, sint
                excepturi itaque non recusandae perspiciatis magnam. Magnam
                commodi officiis quae excepturi voluptatum harum, ab atque ullam
                enim veritatis modi, expedita iusto necessitatibus minus ex
                vitae et nemo cumque, officia repellendus quam. Quas voluptates
                iure blanditiis deleniti labore enim ad nesciunt eveniet, iusto
                vel veniam eum exercitationem minus nulla esse laborum amet
                delectus quam nemo nostrum, natus, odit fugiat? Minima, iste.
                Provident, obcaecati! Tempore, est recusandae, nesciunt repellat
                id a et velit quae architecto nostrum expedita necessitatibus
                laboriosam magni ipsum amet aliquid animi laudantium, fugit
                consectetur. Corporis deserunt possimus molestiae nam cum
                facilis ipsum eligendi velit cupiditate culpa. Voluptate enim
                ratione qui temporibus voluptatibus? Suscipit eligendi non
                libero. Nam voluptatibus aperiam inventore non adipisci atque
                sint. Nisi, obcaecati autem quaerat laboriosam necessitatibus
                ullam aut porro eius nam recusandae id incidunt placeat animi
                assumenda sed cumque ratione beatae dolorum saepe cum fuga
                maiores tenetur sunt cupiditate? Unde, omnis aspernatur
                molestias aliquam velit dolores sunt placeat. Facere voluptatum
                impedit asperiores tempora, excepturi atque esse, debitis
                inventore incidunt error quibusdam quisquam minus vitae?
                Perferendis molestiae impedit aperiam consectetur cupiditate.
                Blanditiis officiis eius asperiores sit porro quam maxime vero
                laudantium corrupti esse natus doloribus veritatis expedita
                libero, provident, mollitia necessitatibus eos quo aliquam
                corporis! Consequatur omnis ipsa fugit nobis voluptate neque,
                quam suscipit soluta. Sint, sequi mollitia. Incidunt dolore
                nulla ratione non pariatur suscipit sit fugit quasi, magnam ad
                eos veniam eligendi tempore totam assumenda, quod sed quos
                nostrum officia.
              </div>
              <WriteComment />
              <CommentSection />
              <Pagination />
            </div>
            <PopularPosts
              className={styles.popularPosts}
              borderRad="20px"
              marginBlock="5%"
              isOutline="2px"
            />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default SingleBlogPage;
