import styles from "./home.module.css"
import Image from "next/image"

const Home = () => {
    return (
        <div className={styles.container}>
           <div className={styles.txtContainer}>
                <h1 className={styles.title}>Mana Parole</h1>
                <p className={styles.descr}>
                    Laipni lūdzam digitālās drošības portālā Mana Parole.
                    Mana parole satur gan informāciju un mācību materiālus par drošām parolēm,
                    gan arī reģistrējot savu kontu ir iespējams iegūt piekļuvi pie drošas paroļu glabātuves.
                </p>
                <div className={styles.buttons}>
                    <button className={styles.button}>Par mums</button>
                    <button className={styles.button}>Kontakti</button>
                </div>
                <div className={styles.brands}>
                    <Image src="/brands.jpg" alt="" fill className={styles.brandImg}/>
                </div>
            </div>
           <div className={styles.imgContainer}>
                <Image src="/passlock.jpg" alt="" fill className={styles.passImg}/>
           </div>
        </div>
    )
    
}

export default Home;