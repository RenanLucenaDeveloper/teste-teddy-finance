import { useState, type FormEvent } from "react"
import type { loginData } from "../dtos/login-dto"
import Button from "../components/Button"
import { useLogin } from "../store/authStore"
import Input from "../components/Input"
import { useNavigate } from "react-router"


const Login = () => {
  const [name, setName] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const login = useLogin()

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      if(isSubmitting) return
      setSubmitting(true)
      
      const loginInfo: loginData = { name }
      console.log(login)
      setTimeout(() => {
        login(loginInfo);
        navigate("/clients")
      }, 1500)
    }
    catch(error) {
      console.log(error)
    }
    finally {
      setTimeout(() => {
        setSubmitting(false)
      }, 1500)
    }
  }

  return (
    <section className="
      w-full h-vh h-dvh
      flex flex-col items-center justify-center
      fade-in"
    >
      <h1 className="primary-text text-4xl/11 text-center mb-5">Olá, seja bem-vindo!</h1>
      <form onSubmit={submitForm} className="min-w-xs max-w-lg w-full">
        <Input 
          id="name" inputSize='lg' value={name} placeholder="Digite o seu nome:"
          onChange={(e) => setName(e.target.value)}
        />

        <Button type='submit' className="mt-5" disabled={ !name.length || isSubmitting } loading={ isSubmitting }>
          Entrar
        </Button>
      </form>
    </section>
  )
}

export default Login
