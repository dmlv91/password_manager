"use client"
import { register } from "@/lib/actions";
import styles from "./registerForm.module.css"
import {useFormState} from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

function RegisterForm() {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@# \$%\^&\*])');
    const length = new RegExp('(?=.{10,})')
    const [state,formAction] = useFormState(register,undefined);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      img: null,
    });
    const [lowerValidated, setLowerValidated]=useState(false);
    const [upperValidated, setUpperValidated]=useState(false);
    const [numberValidated, setNumberValidated]=useState(false);
    const [specialValidated, setSpecialValidated]=useState(false);
    const [lengthValidated, setLengthValidated]=useState(false);
    const [equalValidated,setEqualValidated] = useState(false);
    const [validated,setValidated] = useState(false);

    const handleInputChange = (e) => {
      const {name,value} = e.target;
      if (name == "password") {
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
      if (name == "passwordRepeat") {
        if (value === formData.password) {
          setEqualValidated(true)
        } else {
          setEqualValidated(false)
        }
      }
      setFormData({...formData, [name]: value});
    }

    //transform image file to a base64 string for easier data handling and storage.
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
          setFormData({ ...formData, img: reader.result });
      };
      reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formAction(formData);
    };

    const router = useRouter();
    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success,router]);

    useEffect(() => {
        const isValid = lowerValidated && upperValidated && numberValidated && specialValidated && lengthValidated && equalValidated;
        setValidated(isValid);
      }, [lowerValidated, upperValidated, numberValidated, specialValidated, lengthValidated, equalValidated]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='Lietotājvārds' name='username' onChange={handleInputChange}/>
        <input type='email' placeholder='E-pasts' name='email'onChange={handleInputChange}/>
        <input type="file" name="img" accept="image/*" onChange={handleFileChange}/>
        <input type='password' placeholder='Parole' name='password'onChange={handleInputChange}/>
        <input type='password' placeholder='Parole atkārtoti' name='passwordRepeat' onChange={handleInputChange}/>
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
          <div className={equalValidated?styles.validated : styles.notValidated}>
            {equalValidated?(
              <span className={styles.iconGreen}>
                <FaCheckCircle/>  
              </span>
            ):(
              <span className={styles.iconRegular}>
                <FaExclamationCircle/>  
              </span>
            )}
            Paroles sakrīt
          </div>
        </main>
        {validated?(
            <button className={styles.btn}>Reģistrēties</button>
        ) : (
            <button className={styles.btnInactive}>Reģistrēties</button>
        )}
        <span className={styles.error}>{state?.error}</span>
        <Link href="/login">Esat reģistrējies? <b>Ienākt</b></Link>
    </form>
  )
}

export default RegisterForm