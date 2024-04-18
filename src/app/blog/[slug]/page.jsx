import React, { Suspense } from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'
import PostUser from '@/components/postUser/postUser'
import { getPost } from '@/lib/data';


async function SinglePostPage({params}) {

  const {slug} = params;

  const post = await getPost(slug);
  return (
    <div className={styles.container}>
      {post.img && (<div className={styles.imgContainer}>
        <Image 
          src={post.img} 
          alt='' 
          fill
          className={styles.img} />
      </div>)}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image 
            src='/post2.jpg'
            alt=''
            width={50}
            height={50}
            className={styles.avatar}
          />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.datailValue}>17.04.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          {post.descr}
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage