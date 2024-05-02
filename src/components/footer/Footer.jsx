import styles from "./footer.module.css"
import Image from "next/image"

function Footer() {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>ManaParole</div>
        <div className={styles.brands}>
          <Image src="/brands.jpg" alt="" fill className={styles.brandImg}/>
        </div>
        <div className={styles.text}>
            Digitālo pieejas datu drošības portāls Mana Parole. Visas tiesības aizsargātas.
        </div>
    </div>
  )
}

export default Footer