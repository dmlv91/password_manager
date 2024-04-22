"use client"
import { register } from "@/lib/actions";
import styles from "./registerForm.module.css"
import {useFormState} from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function RegisterForm() {
    const [state,formAction] = useFormState(register,undefined);

    const router = useRouter();
    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success,router]);
  return (
    <form className={styles.form} action={formAction}>
        <input type='text' placeholder='Lietotājvārds' name='username'/>
        <input type='email' placeholder='E-pasts' name='email'/>
        <input type='password' placeholder='Parole' name='password'/>
        <input type='password' placeholder='Parole atkārtoti' name='passwordRepeat'/>
        <button>Register</button>
        {state?.error}
        <Link href="/login">Esat reģistrējies? <b>Ienākt</b></Link>
    </form>
  )
}

export default RegisterForm