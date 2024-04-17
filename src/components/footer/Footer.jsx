import React from 'react'
import styles from "./footer.module.css"

function Footer() {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>ManaParole</div>
        <div className={styles.text}>
            Digitālo pieejas datu drošības portāls Mana Parole. Visas tiesības aizsargātas.
        </div>
    </div>
  )
}

export default Footer