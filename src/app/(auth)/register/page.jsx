import { register } from '@/lib/actions'
import styles from "./register.module.css"

function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} action={register}>
          <input type='text' placeholder='Lietotājvārds' name='username'/>
          <input type='email' placeholder='E-pasts' name='email'/>
          <input type='password' placeholder='Parole' name='password'/>
          <input type='password' placeholder='Parole atkārtoti' name='passwordRepeat'/>
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage