"use client"
import styles from "./passCheckForm.module.css"
import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";


const PassCheckForm = () => {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!() @#\$%\^&\*])');
    const length = new RegExp('(?=.{10,})')
    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);
    const [entropyLevel, setEntropyLevel] = useState('');
    const [entropy, setEntropy] = useState(0);

    const handleInputChange = (e) => {
        var poolSize = 0
        const {name,value} = e.target;
        if(lower.test(value)){
            poolSize += 26
            setLowerValidated(true);
        }else{
            setLowerValidated(false);
        }
        if(upper.test(value)){
            poolSize += 26
            setUpperValidated(true);
        }else{
            setUpperValidated(false);
        }
        if(number.test(value)){
            poolSize += 10
            setNumberValidated(true);
        }else{
            setNumberValidated(false);
        }
        if(special.test(value)){
            poolSize += 34
            setSpecialValidated(true);
        }else{
            setSpecialValidated(false);
        }
        if(length.test(value)){
            setLengthValidated(true);
        }else{
            setLengthValidated(false);
        }
        getPasswordEntropy(value.length,poolSize)
    }

    const getPasswordEntropy = (length, poolSize) => {
      const entropy = Math.log2(Math.pow(poolSize,length));
      let level;
      switch (true){
        case entropy < 36:
          level = "Ļoti vāja";
          break;
        case entropy >= 36 && entropy < 60:
          level = "Vāja";
          break;
        case entropy >= 60 && entropy < 120:
          level = "Droša";
          break;
        case entropy >= 120:
          level = "Ļoti droša";
          break;
        }
      setEntropyLevel(level);
      setEntropy(Math.round(entropy))
    }

    const getClassColor = (entropyLevel) => {
      switch (entropyLevel) {
        case "Ļoti vāja":
          return styles.veryWeak;
        case "Vāja":
          return styles.weak;
        case "Droša":
          return styles.secure;
        case "Ļoti droša":
          return styles.verySecure;
        default:
          return "";
      }
    };

    function handleKeyDown(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }
  return (
    <form className={styles.form}>
        <h2>Pārbaudīt paroles atbilstību drošas paroles kritērijiem:</h2>
        <input type='text' placeholder='Parole' name='password'onChange={handleInputChange} onKeyDown={handleKeyDown}/>
        <main className={styles.tracker}>
          <span>Paroles drošības līmenis (Entropija): <span className={getClassColor(entropyLevel)}>{entropyLevel} ({entropy} biti)</span></span>
          <div className={lowerValidated?styles.validated : styles.notValidated}>
            {lowerValidated?(
              <span className={styles.iconGreen}>
                <FaCheckCircle/>  
              </span>
            ):(
              <span className={styles.iconRegular}>
                <FaExclamationCircle/>  
              </span>
            )}
            Vismaz viens mazais burts
          </div>
          <div className={upperValidated?styles.validated : styles.notValidated}>
            {upperValidated?(
              <span className={styles.iconGreen}>
                <FaCheckCircle/>  
              </span>
            ):(
              <span className={styles.iconRegular}>
                <FaExclamationCircle/>  
              </span>
            )}
            Vismaz viens lielais burts
          </div>
          <div className={numberValidated?styles.validated : styles.notValidated}>
            {numberValidated?(
              <span className={styles.iconGreen}>
                <FaCheckCircle/>  
              </span>
            ):(
              <span className={styles.iconRegular}>
                <FaExclamationCircle/>  
              </span>
            )}
            Vismaz viens cipars
          </div>
          <div className={specialValidated?styles.validated : styles.notValidated}>
            {specialValidated?(
              <span className={styles.iconGreen}>
                <FaCheckCircle/>  
              </span>
            ):(
              <span className={styles.iconRegular}>
                <FaExclamationCircle/>  
              </span>
            )}
            Vismaz viens speciālais simbols
          </div>
          <div className={lengthValidated?styles.validated : styles.notValidated}>
            {lengthValidated?(
              <span className={styles.iconGreen}>
                <FaCheckCircle/>  
              </span>
            ):(
              <span className={styles.iconRegular}>
                <FaExclamationCircle/>  
              </span>
            )}
            Vismaz 10 rakstzīmes
          </div>
        </main>
    </form>
  )
}

export default PassCheckForm