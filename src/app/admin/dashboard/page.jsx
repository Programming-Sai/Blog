'use client'
import React, { useContext } from 'react'
import styles from './dashboard.module.css';
import ThemeToggle from '@/components/themetoggle/ThemeToggle';
import Searchbar from '@/components/searchbar/Searchbar';
import { ThemeContext } from '@/context/ThemeContext'
import Card from '@/components/card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCab } from '@fortawesome/free-solid-svg-icons';


const DashBoard = () => {
  const { setToggleSidePane, toggleSidePane } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px', zIndex:10} : {'--left': '300px', zIndex:10}}>
      
      
      
      
      <div className={styles.top}>
      <p className={`${styles.buton} ${styles.open}`} style={{zIndex:100}} onClick={(event) => {
          event.stopPropagation(); 
          setToggleSidePane(!toggleSidePane);
        }}>
          { '☰' }
      </p>        
      <h1>Dashboard</h1>
      <ThemeToggle />
      </div>
{/* 
      <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima accusamus dolorem ex officia reiciendis hic dolores exercitationem at fuga maxime porro quis soluta iusto sapiente corporis, labore, nisi iste? Deserunt eius dicta officiis incidunt beatae, maxime neque maiores corrupti? Vero labore quos accusantium, provident officia earum sint maiores rem fugiat, vel necessitatibus totam. Facere quia, consequatur quasi, debitis corporis eveniet nesciunt obcaecati laudantium illo aliquid, iure neque qui distinctio ex. Soluta magni praesentium dolor labore! Similique sequi corrupti commodi aperiam nisi dolorum eos ea natus quia. Nemo exercitationem quidem ut beatae illo alias ratione, iusto distinctio velit accusantium obcaecati doloremque laborum. Totam id, deleniti fugit obcaecati fuga quo iure expedita quisquam commodi nemo delectus, eius maiores vero veritatis tenetur in repellat earum quasi vitae. Expedita labore iure laborum aut aspernatur quas voluptates odio quisquam itaque nihil doloremque explicabo, illum vero pariatur velit autem aperiam molestias voluptas dignissimos quae eius nostrum consequuntur. Perferendis quisquam at numquam nostrum, possimus voluptatem recusandae minima tempora. Sed ut porro provident obcaecati consequuntur fuga laborum laboriosam culpa ab delectus aperiam ratione minus quaerat debitis ipsa corporis aliquam nam labore suscipit ullam, ipsam alias tempore! Possimus accusamus qui iste neque libero, blanditiis maiores minus architecto, molestias vitae necessitatibus. Quibusdam in facilis sunt velit sit possimus, at aut inventore assumenda voluptates, provident quisquam, voluptas aliquam. Earum suscipit unde id veniam placeat eligendi dicta. Eligendi nostrum accusamus explicabo, modi eius, quas quasi et consequuntur aliquam dicta nemo totam ipsum iure. Accusantium sed sint, reprehenderit ratione iure, eaque labore praesentium nihil aspernatur officiis voluptatibus quo eos doloremque quia in voluptatum officia deleniti quae temporibus distinctio. Distinctio harum magnam voluptas illo maxime, rerum non dolores fugiat? Provident, quos. Laboriosam sed quia ratione dicta, nesciunt suscipit, ea, necessitatibus architecto unde eos quam ad quod. Commodi tempora sequi possimus nesciunt distinctio repellat iste corrupti consequatur maxime eos ducimus in, omnis corporis reiciendis? Fugit commodi ea eveniet ipsum odio voluptatem quod maiores natus magnam, ipsa tenetur ad pariatur magni nihil officia! Nemo eos nisi officiis! Dignissimos sapiente ratione inventore ipsum aliquam temporibus impedit aperiam iusto doloremque. Natus fugiat totam nam iure hic, praesentium repudiandae quos molestiae, ipsum rem itaque velit alias at quibusdam, id mollitia dolore cum enim aliquid eaque quis. Cupiditate nihil dolore assumenda tenetur necessitatibus voluptatum nam laudantium accusantium neque dolorum pariatur explicabo architecto quod minus quam, adipisci itaque eum beatae expedita. Aut amet dolorum cum, doloribus excepturi quidem natus aliquam incidunt earum atque repudiandae modi quia voluptatum cupiditate suscipit exercitationem, eligendi facilis temporibus ex reprehenderit libero molestiae eum. Iste error at rerum corporis quaerat saepe fugiat ex dolore asperiores adipisci voluptate voluptatibus architecto corrupti odio doloremque eaque quas, qui quos pariatur necessitatibus voluptatem laborum. Excepturi facilis placeat iure perspiciatis cupiditate animi quisquam reprehenderit quia ea? Ullam nobis possimus iste cum eius voluptates, magni error. Aliquam, perspiciatis neque? Iusto voluptate quas neque at temporibus reiciendis vero impedit, accusamus maiores. Iusto cupiditate officia totam corporis, fugit inventore ea! Autem accusamus dicta quidem! Velit reiciendis rem iure animi consectetur enim voluptatum cupiditate architecto dolore ipsam? Perferendis alias aliquam sed quaerat voluptate nobis numquam cupiditate tenetur. Vel tempora tenetur, ea dolor repudiandae possimus consequuntur rem iure molestiae? Illum accusamus sequi quaerat rem inventore tempore quasi nihil porro nesciunt earum ullam tenetur placeat tempora autem, necessitatibus nemo harum dolores a ipsam qui? Natus inventore dignissimos maiores labore molestias iure cupiditate saepe consectetur voluptates omnis! Id dignissimos delectus atque minima numquam unde nobis possimus cupiditate eos, temporibus iure perspiciatis aut dicta. Qui, alias nobis unde cumque natus deserunt, temporibus veniam repellat voluptatibus, quas iure culpa velit fugiat molestiae aliquam quasi aperiam esse consequatur numquam eius magni cupiditate odit. Atque explicabo et esse vero nemo itaque perspiciatis blanditiis? Sint consectetur magni corporis ipsa numquam, ipsum dolor, ullam reiciendis explicabo odio qui? Atque numquam temporibus doloremque vitae asperiores similique necessitatibus excepturi, accusantium quam nemo ex nam deserunt rem, ad a ipsa quisquam soluta explicabo. Eaque dolor cum odio. Aliquam, vitae. Enim, sed. Excepturi ut facilis hic illo laudantium non praesentium itaque est temporibus, aspernatur tempora natus molestiae officia, rerum commodi id dolorem veniam labore amet minima unde odio omnis qui? Distinctio deleniti corporis amet commodi, laudantium sed nostrum dolorum quibusdam laboriosam autem id, explicabo iusto facere ipsam cum, sit reprehenderit possimus repellendus libero culpa accusamus quia officia dicta. Beatae illum fugiat nesciunt aliquid quidem aut quod aliquam hic consequuntur vel, voluptatibus deleniti iusto explicabo, adipisci enim! Perferendis exercitationem eos debitis quo amet tempore eveniet ipsam aspernatur impedit esse nihil voluptatibus laboriosam molestias eaque, animi consequatur nostrum labore soluta. Officia quas iusto reprehenderit illo deserunt quisquam sequi in ducimus asperiores eaque eius vero, nulla consequuntur? Ea, magnam odit nam, odio, atque beatae aliquam quos sint doloremque vitae quam distinctio iste veniam ipsa eius! Quasi nam sapiente ad. Obcaecati exercitationem quia ullam, repudiandae quos totam sunt ratione ipsam facilis nisi ut. Cumque neque porro possimus eum odio tempora cum consequuntur qui delectus id sint ut repellat culpa veritatis, minus deserunt distinctio ea veniam voluptatum esse voluptatibus impedit nemo repellendus. Expedita mollitia perspiciatis id quaerat quae magnam sunt quasi nulla, obcaecati error dolore ducimus laudantium tenetur unde modi ea cupiditate, optio non qui vero repellat aliquid voluptas adipisci numquam. Saepe aliquam, amet accusantium ullam praesentium velit ut laborum eius repudiandae ab a impedit explicabo nemo possimus modi ex laudantium ad obcaecati delectus. Temporibus iure eius corporis, quas qui atque. Ex, dignissimos. Labore sequi illum necessitatibus nemo facere libero, odit voluptas hic nam accusantium quasi tempora in consectetur maiores aspernatur temporibus iusto, consequatur dolor possimus, dicta fuga culpa ex! Sunt cupiditate accusantium quidem esse necessitatibus in? Consequuntur quidem nulla doloribus ratione unde ex delectus iste similique sunt obcaecati exercitationem dolor voluptatum veritatis voluptas dignissimos vero officiis optio ducimus iusto fuga laboriosam corporis, nam tempora veniam. Totam esse a quam rerum facere placeat eligendi asperiores consequatur? Vitae explicabo maiores quos nisi ad iure suscipit aperiam libero voluptatem nobis! Tempore alias, consectetur cum aliquam architecto dolorem eaque. Facere esse aperiam incidunt laborum repellat veritatis, doloremque nisi, animi laboriosam illum eius! Nostrum tempore quae eos consectetur.

      </p> */}

      <div className={styles.topContainer}>
          <Card justify={'space-between'}>
              <div className={styles.left}>
                <FontAwesomeIcon icon={ faCab }/>
                <p className={styles.title}>12,222.00</p>
                <p className={styles.subTitle}>Emails Sent</p>
              </div>
              <div className={styles.right} style={{'--value':200, '--color': 'red'}}>
                  <svg>
                    <circle cx={45} cy={45} r={36}/>
                  </svg>
                  <div className={styles.percentage}>
                    90
                  </div>
              </div>
          </Card>
          <Card justify={'space-between'}>
              <div className={styles.left}>
                <FontAwesomeIcon icon={ faCab }/>
                <p className={styles.title}>12,222.00</p>
                <p className={styles.subTitle}>Emails Sent</p>
              </div>
              <div className={styles.right} style={{'--value':180, '--color': 'green'}}>
                  <svg>
                    <circle cx={45} cy={45} r={36}/>
                  </svg>
                  <div className={styles.percentage}>
                    90
                  </div>
              </div>
          </Card>
          <Card justify={'space-between'}>
              <div className={styles.left}>
                <FontAwesomeIcon icon={ faCab }/>
                <p className={styles.title}>12,222.00</p>
                <p className={styles.subTitle}>Emails Sent</p>
              </div>
              <div className={styles.right} style={{'--value':100, '--color': 'gold'}}>
                  <svg>
                    <circle cx={45} cy={45} r={36}/>
                  </svg>
                  <div className={styles.percentage}>
                    90
                  </div>
              </div>
          </Card>
          <Card justify={'space-between'}>
              <div className={styles.left}>
                <FontAwesomeIcon icon={ faCab }/>
                <p className={styles.title}>12,222.00</p>
                <p className={styles.subTitle}>Emails Sent</p>
              </div>
              <div className={styles.right} style={{'--value':150, '--color': 'lightblue'}}>
                  <svg>
                    <circle cx={45} cy={45} r={36}/>
                  </svg>
                  <div className={styles.percentage}>
                    90
                  </div>
              </div>
          </Card>
      </div>





      <div className={styles.secondRow}>
          <Card>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatum repellendus! Praesentium distinctio blanditiis accusamus, architecto, molestiae fuga earum aliquid repudiandae vitae magnam obcaecati! Pariatur alias, amet nisi dicta, saepe tenetur sequi magnam earum quisquam, consequatur veritatis? Itaque voluptate ratione repellendus voluptatum nam tempore culpa accusamus! Sequi tempore quas obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatum repellendus! Praesentium distinctio blanditiis accusamus, architecto, molestiae fuga earum aliquid repudiandae vitae magnam obcaecati! Pariatur alias, amet nisi dicta, saepe tenetur sequi magnam earum quisquam, consequatur veritatis? Itaque voluptate ratione repellendus voluptatum nam tempore culpa accusamus! Sequi tempore quas obcaecati.
          </Card>

          <Card>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatum repellendus! Praesentium distinctio blanditiis accusamus, architecto, molestiae fuga earum aliquid repudiandae vitae magnam obcaecati! Pariatur alias, amet nisi dicta, saepe tenetur sequi magnam earum quisquam, consequatur veritatis? Itaque voluptate ratione repellendus voluptatum nam tempore culpa accusamus! Sequi tempore quas obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatum repellendus! Praesentium distinctio blanditiis accusamus, architecto, molestiae fuga earum aliquid repudiandae vitae magnam obcaecati! Pariatur alias, amet nisi dicta, saepe tenetur sequi magnam earum quisquam, consequatur veritatis? Itaque voluptate ratione repellendus voluptatum nam tempore culpa accusamus! Sequi tempore quas obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatum repellendus! Praesentium distinctio blanditiis accusamus, architecto, molestiae fuga earum aliquid repudiandae vitae magnam obcaecati! Pariatur alias, amet nisi dicta, saepe tenetur sequi magnam earum quisquam, consequatur veritatis? Itaque voluptate ratione repellendus voluptatum nam tempore culpa accusamus! Sequi tempore quas obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatum repellendus! Praesentium distinctio blanditiis accusamus, architecto, molestiae fuga earum aliquid repudiandae vitae magnam obcaecati! Pariatur alias, amet nisi dicta, saepe tenetur sequi magnam earum quisquam, consequatur veritatis? Itaque voluptate ratione repellendus voluptatum nam tempore culpa accusamus! Sequi tempore quas obcaecati.
          </Card>
      </div>
   
    </div>
  )
}

export default DashBoard
