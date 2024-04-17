"use client"

import React, { useState } from 'react'
import styles from './links.module.css'
import NavLink from './navLink/navLink';
import Image from 'next/image'


function Links() {


    const links = [
        {   title: "Sākums",
            path: "/", 
        },
        {   title: "Par mums",
            path: "/info", 
        },
        {   title: "Blogs",
            path: "/blog", 
        },
        {   title: "Testi",
            path: "/tests",
        },
        {   title: "Kontakti",
            path: "/contacts", 
        },
    ];

    const [open,setOpen] = useState(false)


    //TEMP
    const session = true
    const isAdmin = true

  return (
    <div className={styles.container}>
        <div className={styles.links}>
            {links.map((link =>(
                <NavLink item={link} key={link.title}/>
            )))} {
                session ? (
                    <>
                    {isAdmin && <NavLink item={{title: "Admin", path: "/admin"}}/>}
                    <button className={styles.logout}>Iziet</button>
                    </>
                ) : (
                    <NavLink item={{title: "Ienākt", path: "/login"}}/>
                )}
        </div>
        <Image 
            src='/menu.svg' 
            alt='' 
            width={30} 
            height={30} 
            onClick={() => setOpen(prev => !prev)}
            className={styles.menuButton} 
            />
        {
            open && <div className={styles.mobileLinks}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title}/>
                ))}
            </div>
        }
    </div>
    
  )
}

export default Links