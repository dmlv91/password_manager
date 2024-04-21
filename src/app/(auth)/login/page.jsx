import { auth, signIn } from '@/lib/auth'
import React from 'react'

async function Login() {

  const session = await auth();
  const handleGithubLogin = async () => {
    "use server"
    await signIn("github");

  }
  const handleGoogleLogin = async () => {
    "use server"
    await signIn("google");

  }
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
      <form action={handleGoogleLogin}>
        <button>Login with Google</button>
      </form>
    </div>
  )
}

export default Login