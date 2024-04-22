import { Suspense } from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'
import PostUser from '@/components/postUser/postUser'
import { getPost } from '@/lib/data';

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

  if(!res.ok) {
    throw new Error("Something wrong")
  }

  return res.json();
}

export const generateMetadata = async({params}) => {
  const {slug} = params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.descr,
  };
}


async function SinglePostPage({params}) {

  const {slug} = params;

  // const post = await getPost(slug);
  const post = await getData(slug)
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
          {post && (
          <Suspense fallback={<div>Loading....</div>}>
            <PostUser userId={post.userId}/>
          </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.datailValue}>{post.createdAt.toString().slice(4,16)}</span>
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