import React from 'react'
import Link from 'next/link'
import Links from './links/Links'
import styles from "./navbar.module.css"
import {auth} from "@/lib/auth"

async function Navbar() {

  const session = await auth();
  return (
    <div>
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>Logo</Link>
            
            <Links session={session}/>
        </div>
    </div>
  )
}

export default Navbar