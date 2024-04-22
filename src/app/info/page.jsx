import Image from "next/image"
import styles from "./info.module.css"

function ParMums() {
  return (
    <div className={styles.container}>
      <div className={styles.txtContainer}>
          <h2 className={styles.subtitle}>Par Mums</h2>
          <h1 className={styles.title}>Mana Parole ir mana drošība</h1>
          <p className={styles.descr}>
          Digitālās tehnoloģijas ir neaizvietojama daļa mūsu ikdienas dzīves, 
          bet tās nes līdzi arī drošības riskus. Viens no svarīgākajiem veidiem, 
          kā aizsargāt savu digitālo identitāti, ir stipru un drošu paroļu izmantošana.
          </p>
          <div className={styles.boxes}>
              <div className={styles.box}>
                <h1>1000+</h1>
                <p>Ģenerētas drošas paroles</p>
              </div>
              <div className={styles.box}>
                <h1>50+</h1>
                <p>Ikdienas lietotāji</p>
              </div>
              <div className={styles.box}>
                <h1>10000+</h1>
                <p>Lapas skatījumi</p>
              </div>
          </div>
      </div>
      <div className={styles.imgContainer}>
          <Image 
            src="/locked_password.jpg" 
            alt="" 
            fill 
            className={styles.img}/>
      </div>
    </div>
  )
}

export default ParMums