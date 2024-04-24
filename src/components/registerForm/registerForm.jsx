"use client"
import { register } from "@/lib/actions";
import styles from "./registerForm.module.css"
import {useFormState} from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      setFormData({...formData, [name]: value});
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
        <Link href="/login">Esat reģistrējies? <b>Ienākt</b></Link>
    </form>
  )
}

export default RegisterForm