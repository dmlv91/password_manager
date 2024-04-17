import React from 'react'
import styles from './postCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

function PostCard() {
  return (
    <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.imgContainer}>
            <Image src='/post.jpg' alt='' fill className={styles.img}/>
          </div>
          <span className={styles.date}>17.04.2024</span>
        </div>
        <div className={styles.bottom}>
          <h1 className={styles.title}>Nosaukums</h1>
          <p className={styles.descr}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Totam rerum qui magnam molestiae consectetur corrupti maxime, 
            ullam quod asperiores aperiam dolore vel architecto illo, 
            eligendi laborum voluptatem voluptatum quisquam ipsum!
          </p>
          <Link className={styles.link} href="/blog/post">Rādīt vairāk</Link>
        </div>
    </div>
  )
}

export default PostCard