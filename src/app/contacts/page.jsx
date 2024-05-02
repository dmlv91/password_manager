"use client"
import Swal from "sweetalert2";
import styles from "./contacts.module.css"
import { useRef, useState } from "react";

function Contacts() {
  const validPhoneNumber = new RegExp('^\\+(?:[0-9]●?){6,14}[0-9]$')
  const validEmailAddress = new RegExp('(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)')
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);
  const msgInput = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailValidated, setEmailValidated] = useState(true);
  const [phoneValidated, setPhoneValidated] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (nameInput.current.value && emailInput.current.value && phoneInput.current.value && msgInput.current.value && emailValidated && phoneValidated) {
      Swal.fire("Ziņa ir nosūtīta!");
      setIsSubmitted(true)
      nameInput.current.value = '';
      emailInput.current.value = '';
      phoneInput.current.value = '';
      msgInput.current.value = '';
    } else {
      Swal.fire("Lūdzu aizpildiet visus laukus!");
    }
  }

  const handleInputChange = (e) => {
    const {name,value} = e.target;

    if(name == "email") {
      if (validEmailAddress.test(value) || !emailInput.current.value) {
        setEmailValidated(true)
      } else {
        setEmailValidated(false)
      }
    }

    if (name == "phone") {
      if (validPhoneNumber.test(value) || !phoneInput.current.value) {
        setPhoneValidated(true)
      } else {
        setPhoneValidated(false)
      }
    }
  }
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
          <input type='text' placeholder='Jūsu vārds' ref={nameInput}/>
          <input type='text' name="email" placeholder='E-pasta adrese' ref={emailInput} onChange={handleInputChange}/>
          {emailValidated ? (<span></span>) : (<span className={styles.error}>Nederīga e-pasta adrese</span>)}
          <input type='text' name="phone" placeholder='Telefona numurs' ref={phoneInput} onChange={handleInputChange}/>
          {phoneValidated ? (<span></span>) : (<span className={styles.error}>Tālruņa numurs neatbilst prasībām</span>)}
          <textarea name='' cols='30' rows='10' placeholder='Jūsu ziņa' ref={msgInput}></textarea>
          <button className={styles.formBtn} onClick={handleFormSubmit}>Nosūtīt</button>
        </form>
      </div>
    </div>
  )
}

export default Contacts