import styles from './postCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

function PostCard({post}) {
  const isoDate = post.createdAt.toString();
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  const formattedDate = `${day}:${month}:${year}`;

  return (
    <div className={styles.container}>
        <div className={styles.top}>
          {post.img && <div className={styles.imgContainer}>
            <Image src={post.img} alt='' fill className={styles.img}/>
          </div>}
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <div className={styles.bottom}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.descr}>{post.descr}</p>
          <Link className={styles.link} href={`/blog/${post.slug}`}>Rādīt vairāk</Link>
        </div>
    </div>
  )
}

export default PostCard