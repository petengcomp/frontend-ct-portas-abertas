import Router from 'next/router';
import { useState } from 'react';
import { api } from '../services/api';
import styles from '../styles/components/RegisterForms.module.css'
import Button from './Button'

export const RegisterSchoolForm = () => {
  const [ name, setName ] = useState<string>("");
  const [ nameRes, setNameRes ] = useState<string>("");
  const [ studentsAmount, setStudentsAmount ] = useState<number>();
  const [ cpfRes, setCpfRes ] = useState<number>();
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ emailRes, setEmailRes ] = useState<string>("");

  async function handleSignUp(){
    if (password!=confirmPassword) {
      alert('As senhas não estão iguais!')
      return
    }
    
    await api.post('school', {
      name, nameRes, studentsAmount, cpfRes:String(cpfRes), password, emailRes
    }).then(()=>{
      alert('Cadastrado com sucesso! Faça seu login para acessar os eventos')
      Router.push('/')
    }).catch((err)=>err.response.data.message.map((m:string)=>alert(m)))

  }

  return (
    <section className={styles.container}>
      <h1>Cadastro escola</h1>

      <form>
        <div className={styles.leftInputs}>
          <input type='text' onChange={(e)=>setName(e.target.value)} /><br />
          <label>Nome da escola</label><br />

          <input type='text' onChange={(e)=>setNameRes(e.target.value)} /><br />
          <label>Nome do responsável</label><br />

          <input type='password' onChange={(e)=>setPassword(e.target.value)} /><br />
          <label>Senha</label><br />

          <input type='password' onChange={(e)=>setConfirmPassword(e.target.value)} /><br />
          <label>Confirmação de senha</label>
          {password!=confirmPassword?<p>Senhas estão diferentes!</p>:""}
        </div>

        <div>
          <input type='number' onChange={(e)=>setCpfRes(parseInt(e.target.value))} /><br />
          <label>CPF do responsável (apenas números)</label><br />

          <input type='email' onChange={(e)=>setEmailRes(e.target.value)} /><br />
          <label>Email do responsável</label><br />
          
          <input type='number' onChange={(e)=>setStudentsAmount(parseInt(e.target.value))} /><br />
          <label>Número de alunos</label><br />
        </div>
      </form>

      <div onClick={handleSignUp}><Button text='SALVAR CADASTRO' /></div>
      <br />
    </section >

  )
}
