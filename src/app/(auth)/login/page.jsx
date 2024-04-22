import { login } from '@/lib/actions'
import { auth, signIn } from '@/lib/auth'

async function Login() {

  return (
    <div>
      <form action={login}>
        <input type="text" name="username" placeholder="lietotājvārds" />
        <input type="password" name="password" placeholder="parole" />
        <button>Ienākt</button>
      </form>
    </div>
  )
}

export default Login