import React from 'react'
import styles from './blog.module.css'
import Image from 'next/image'
import PostCard from '@/components/postCard/PostCard'

function Blog() {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <PostCard></PostCard>
      </div>
      <div className={styles.post}>
        <PostCard></PostCard>
      </div>
      <div className={styles.post}>
        <PostCard></PostCard>
      </div>
      <div className={styles.post}>
        <PostCard></PostCard>
      </div>
    </div>
  )
}

export default Blog