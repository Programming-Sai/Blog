import React from "react";
import styles from "./editorpick.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";

const EditorPick = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editor's Pick</h1>
      <div className={styles.editorsPickContainer}>
        <Glow
          top="0"
          left="0"
          width={500}
          height={500}
          color="gold"
          mtop="0"
          mleft="0"
        />
        <div className={styles.rowTwo}>
          <div className={styles.item}>
            <div className={styles.innerContainer}>
              <Image
                src={`${BASE_PATH}/fashion.png`}
                fill
                alt="img"
                className={styles.img}
              />
            </div>
            <div className={styles.innerContainer}>
              <div className={styles.postTagTime}>
                <p className={styles.tag}>Travel</p>
                <div className={styles.time}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>3min read</p>
                </div>
              </div>
              <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium dolorem officia, amet suscipit doloribus accusantium
                animi qui odio est! Nemo!
              </p>
              <div className={styles.dateRead}>
                <p className={styles.date}>25 Nov 2024</p>
                <button className={styles.read}>Read More</button>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.innerContainer}>
              <Image
                src={`${BASE_PATH}/food.png`}
                fill
                alt="img"
                className={styles.img}
              />
            </div>
            <div className={styles.innerContainer}>
              <div className={styles.postTagTime}>
                <p className={styles.tag}>Travel</p>
                <div className={styles.time}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>3min read</p>
                </div>
              </div>
              <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium dolorem officia, amet suscipit doloribus accusantium
                animi qui odio est! Nemo!
              </p>
              <div className={styles.dateRead}>
                <p className={styles.date}>25 Nov 2024</p>
                <button className={styles.read}>Read More</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rowTwo}>
          <div className={styles.item}>
            <div className={styles.innerContainer}>
              <Image
                src={`${BASE_PATH}/travel.png`}
                fill
                alt="img"
                className={styles.img}
              />
            </div>
            <div className={styles.innerContainer}>
              <div className={styles.postTagTime}>
                <p className={styles.tag}>Travel</p>
                <div className={styles.time}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>3min read</p>
                </div>
              </div>
              <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium dolorem officia, amet suscipit doloribus accusantium
                animi qui odio est! Nemo!
              </p>
              <div className={styles.dateRead}>
                <p className={styles.date}>25 Nov 2024</p>
                <button className={styles.read}>Read More</button>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.innerContainer}>
              <Image
                src={`${BASE_PATH}/culture.png`}
                fill
                alt="img"
                className={styles.img}
              />
            </div>
            <div className={styles.innerContainer}>
              <div className={styles.postTagTime}>
                <p className={styles.tag}>Travel</p>
                <div className={styles.time}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>3min read</p>
                </div>
              </div>
              <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium dolorem officia, amet suscipit doloribus accusantium
                animi qui odio est! Nemo!
              </p>
              <div className={styles.dateRead}>
                <p className={styles.date}>25 Nov 2024</p>
                <button className={styles.read}>Read More</button>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.innerContainer}>
              <Image
                src={`${BASE_PATH}/style.png`}
                fill
                alt="img"
                className={styles.img}
              />
            </div>
            <div className={styles.innerContainer}>
              <div className={styles.postTagTime}>
                <p className={styles.tag}>Travel</p>
                <div className={styles.time}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>3min read</p>
                </div>
              </div>
              <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium dolorem officia, amet suscipit doloribus accusantium
                animi qui odio est! Nemo!
              </p>
              <div className={styles.dateRead}>
                <p className={styles.date}>25 Nov 2024</p>
                <button className={styles.read}>Read More</button>
              </div>
            </div>
          </div>
        </div>
        <Glow
          top="70%"
          left="80%"
          width={500}
          height={500}
          color="#11F027"
          mtop="90%"
          mleft="50%"
        />

        <Glow
          top="70%"
          left="80%"
          width={500}
          height={500}
          color="#11F027"
          mtop="90%"
          mleft="50%"
        />
      </div>
    </div>
  );
};

export default EditorPick;
