"use client"
import React from 'react'
import styles from "./contacts.module.css"
import Image from 'next/image'

function Contacts() {
  console.log("it workss here")
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.contactContainer}>
          <h2>Kontakti</h2>
          <p>
            SIA ManaParole
            Mazā paroļu iela 17, Rīga, LV-1010
            T. +37167890987
            e-pasts: info@manaparole.lv
          </p>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sazinieties ar mums!</h2>
        <form action='' className={styles.form}>
          <input type='text' placeholder='Jūsu vārds'/>
          <input type='text' placeholder='E-pasta adrese'/>
          <input type='text' placeholder='Telefona numurs'/>
          <textarea name='' cols='30' rows='10' placeholder='Jūsu ziņa'></textarea>
          <button className={styles.formBtn}>Nosūtīt</button>
        </form>
      </div>
    </div>
  )
}

export default Contacts