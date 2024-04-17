import React from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'

function SinglePostPage() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image 
          src='/post.jpg' 
          alt='' 
          fill
          className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detail}>
          <Image 
            src='/post2.jpg'
            alt=''
            width={50}
            height={50}
            className={styles.avatar}
          />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.datailValue}>Date</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.datailValue}>17.04.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ipsa eius optio possimus inventore tempore consequuntur 
          est officiis harum consequatur ratione maxime suscipit, 
          voluptate ipsum quo porro aut nihil magni ducimus.
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage