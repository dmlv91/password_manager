import styles from './blog.module.css'
import PostCard from '@/components/postCard/PostCard'

const getData = async () => {
  const res = await fetch(`${process.env.LOCALHOST}/api/blog`, {cache: 'no-store'});


  if(!res.ok) {
    throw new Error("Something wrong")
  }

  return res.json();
}

async function Blog() {
  const posts = await getData();
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post}/>
        </div>
      ))}
    </div>
  )
}

export default Blog