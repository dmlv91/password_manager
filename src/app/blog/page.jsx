import React from 'react'
import styles from './blog.module.css'
import Image from 'next/image'
import PostCard from '@/components/postCard/PostCard'

const getData = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  if (!res.ok) {
      throw new Error("Something went wrong");
  }

  return res.json();
}

async function Blog() {
  const posts = await getData();
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post}/>
        </div>
      ))}
    </div>
  )
}

export default Blog