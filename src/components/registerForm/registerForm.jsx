"use client"
import { register } from "@/lib/actions";
import styles from "./registerForm.module.css"
import {useFormState} from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import bcrypt from "bcryptjs";
import validator from "validator";

function RegisterForm() {
  
    const [state,formAction] = useFormState(register,undefined);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      img: null,
    });

    const handleInputChange = (e) => {
      const {name,value} = e.target;
      if (name == "password") {
        validate(value)
      }
      if (name == "passwordRepeat") {
        if (!validator.equals(value,formData.password)) {
          setErrorMessage("Paroles nesakrīt!")
        } else {
          setErrorMessage("")
        }
      }
      setFormData({...formData, [name]: value});
    }

    const [errorMessage, setErrorMessage] = useState('')
    const validate = (value) => {
      if (!validator.isStrongPassword(value, {
        minLength: 10, minLowercase: 1, minUppercase: 1, minNumbers : 1, minSymbols :1
      })) {
        setErrorMessage("Parole, nav pietiekami droša!")
      } else {
        setErrorMessage("Droša parole")
      }
    }

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
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='Lietotājvārds' name='username' onChange={handleInputChange}/>
        <input type='email' placeholder='E-pasts' name='email'onChange={handleInputChange}/>
        <input type="file" name="img" accept="image/*" onChange={handleFileChange}/>
        <input type='password' placeholder='Parole' name='password'onChange={handleInputChange}/>
        <input type='password' placeholder='Parole atkārtoti' name='passwordRepeat' onChange={handleInputChange}/>
        <button>Register</button>
        {state?.error}
        <span>{errorMessage}</span>
        <Link href="/login">Esat reģistrējies? <b>Ienākt</b></Link>
    </form>
  )
}

export default RegisterForm