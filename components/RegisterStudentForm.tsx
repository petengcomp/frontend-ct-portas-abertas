import Router from 'next/router';
import { useState } from 'react'
import { api } from '../services/api';
import styles from '../styles/components/RegisterForms.module.css'
import Button from './Button'

export const RegisterStudentForm = () => {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<number>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function handleSignUp(){
    if (password!=confirmPassword) {
      alert('As senhas não estão iguais!')
      return
    }
    
    await api.post('student', {
      name, cpf:String(cpf), password, email
    }).then(()=>{
      alert('Cadastrado com sucesso! Faça seu login para acessar os eventos')
      Router.push('/')
    }).catch((err)=>err.response.data.message.map((m:string)=>alert(m)))
  }


  return (
    <section className={styles.container}>
      <h1>Cadastro aluno</h1>

      <form>
        <div className={styles.leftInputs}>
          <input type='text' onChange={(e)=>setName(e.target.value)}/><br />
          <label>Nome completo</label><br />

          <input type='password' onChange={(e)=>setPassword(e.target.value)}/><br />
          <label>Senha</label><br />

          <input type='password' onChange={(e)=>setConfirmPassword(e.target.value)}/><br />
          <label>Confirmação de senha</label>
          {password!=confirmPassword?<p>Senhas estão diferentes!</p>:""}
        </div>

        <div>
          <input type='number' onChange={(e)=>setCpf(parseInt(e.target.value))}/><br />
          <label>CPF (apenas números)</label><br />

          <input type='email' onChange={(e)=>setEmail(e.target.value)}/><br />
          <label>Email</label><br />
        </div>
      </form>

      <div onClick={handleSignUp}><Button text='SALVAR CADASTRO' /></div>
      <br />
    </section>
  )
}
