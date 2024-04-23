import { Suspense } from "react"
import styles from "./admin.module.css"
import AdminPosts from "@/components/adminPosts/adminPosts"
import AdminPostForm from "@/components/adminPostForm/adminPostForm"
import { auth } from "@/lib/auth"

async function Admin() {

  const session = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts/>
          </Suspense>
        </div>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPostForm userId={session.user.id}/>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Admin