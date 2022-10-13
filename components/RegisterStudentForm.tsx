import Router from 'next/router';
import { useState } from 'react'
import Swal from 'sweetalert2';
import { api } from '../services/api';
import styles from '../styles/components/RegisterForms.module.css'
import Button from './Button'

import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

export const RegisterStudentForm = () => {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<number>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);

  async function handleSignUp(){
    if (loading) return
    
    setLoading(true);
    if (password!=confirmPassword) {
      Swal.fire('Calma lá!','As senhas não estão iguais!','warning')
      setLoading(false);
      return
    }

    if (cpf && !validateCPF(cpf)) {
      Swal.fire('CPF Inválido','Digite novamente','error')
      setLoading(false);
      return
    }
    
    await api.post('student', {
      name, cpf:String(cpf), password, email, key:process.env.NEXT_PUBLIC_API_KEY
    }).then(()=>{
      Swal.fire('Cadastrado(a) com sucesso!','Faça seu login para acessar os eventos','success')
      Router.push('/')
    }).catch((err)=>{
      setLoading(false);
      err.response.data.message.map((m:string)=>alert(m))
    })
  }

  function validateCPF(num:number){
    let v1=0, v2=0;
    let str=num.toString();
    if (str.length>11) return 0;
    let arr = []
    for(var i=0;i<str.length-2;i++) arr[i] = str[i];
    arr = arr.reverse();
    for(var i=0;i<arr.length;i++){
      v1 = v1 + parseInt(arr[i]) * (9-(i%10));
      v2 = v2 + parseInt(arr[i]) * (9-((i+1)%10));
    }
    v1=(v1%11)%10;
    v2=v2+v1*9;
    v2=(v2%11)%10;

    if (parseInt(str.slice(-2,-1))!=v1 || parseInt(str.slice(-1))!=v2) return 0;
    return 1;
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
      <div className={styles.loading_container} style={loading?{}:{visibility:'hidden'}}><Spinner /></div>
      <br />
    </section>
  )
}
