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
    const [lowerValidated, setLowerValidated]=useState(false);
    const [upperValidated, setUpperValidated]=useState(false);
    const [numberValidated, setNumberValidated]=useState(false);
    const [specialValidated, setSpecialValidated]=useState(false);
    const [lengthValidated, setLengthValidated]=useState(false);

    const handleInputChange = (e) => {
      const {name,value} = e.target;
        if(lower.test(value)){
            setLowerValidated(true);
            }
        else{
            setLowerValidated(false);
            }
        if(upper.test(value)){
            setUpperValidated(true);
            }
        else{
            setUpperValidated(false);
            }
        if(number.test(value)){
            setNumberValidated(true);
            }
        else{
            setNumberValidated(false);
            }
        if(special.test(value)){
            setSpecialValidated(true);
            }
            else{
        setSpecialValidated(false);
            }
            if(length.test(value)){
        setLengthValidated(true);
            }
            else{
        setLengthValidated(false);
            }
    }

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