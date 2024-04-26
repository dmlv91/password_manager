"use client"

import { login } from "@/lib/actions"
import styles from "./loginForm.module.css"
import {useFormState} from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";



const LoginForm = () => {

    const [state,formAction] = useFormState(login,undefined);
    const router = useRouter();
    


    return (
        <form className={styles.form} action={formAction}>
            <input type="text" name="username" placeholder="lietotājvārds" />
            <input type="password" name="password" placeholder="parole" />
            <button>Ienākt</button>
            <span className={styles.error}>{state?.error}</span>
            <Link href="/register">Neesat reģistrēts? <b>Reģistrēties</b></Link>
        </form>
  )
}

export default LoginForm