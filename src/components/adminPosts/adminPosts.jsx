import { deletePost } from "@/lib/actions"
import styles from "./adminPosts.module.css"
import Image from "next/image"
import { getPosts } from "@/lib/data"

const AdminPosts = async () => {
    const posts = await getPosts();
    return (
      <div className={styles.container}>
          <h1>Posts</h1>
          {posts.map(post=>(
              <div className={styles.post} key={post._id}>
                  <div className={styles.detail}>
                      <Image src={post.img || "/no-image.png"} alt="" width={250} height={250}/>
                      <span className={styles.postTitle}>{post.title}</span>
                  </div>
                <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id}/>
                    <button className={styles.postBtn}>DZĒST</button>
                </form>
              </div>
          ))}
      </div>
    )
}

export default AdminPosts