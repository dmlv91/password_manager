import styles from './blog.module.css'
import Image from 'next/image'
import PostCard from '@/components/postCard/PostCard'
import { getPosts } from '@/lib/data'

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}});

  if(!res.ok) {
    throw new Error("Something wrong")
  }

  return res.json();
}

async function Blog() {
  const posts = await getData();
  // const posts = await getPosts();
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