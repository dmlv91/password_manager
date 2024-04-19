import React from 'react'
import styles from './postUser.module.css'
import Image from 'next/image'
import { getUser } from '@/lib/data';

async function PostUser({userId}) {
    const user = await getUser(userId);
  return (
    <div className={styles.container}>
        <Image 
        src={user.img ? user.img : "/no-avatar.png"}
        alt=''
        width={50}
        height={50}
        className={styles.avatar}
        />
        <div className={styles.texts}>
            <span className={styles.title}>Author</span>
            <span className={styles.username}>{user.username}</span>
        </div>
  </div>
  )
}

export default PostUser