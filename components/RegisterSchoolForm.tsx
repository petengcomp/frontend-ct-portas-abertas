import Router from 'next/router';
import { useState } from 'react';
import { api } from '../services/api';
import styles from '../styles/components/RegisterForms.module.css'
import Button from './Button'
import Swal from 'sweetalert2'

import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

export function validateCPF(str:String){
  let v1=0, v2=0;

  if (str.length>11 ||
    str == "00000000000" || 
		str == "11111111111" || 
		str == "22222222222" || 
		str == "33333333333" || 
		str == "44444444444" || 
		str == "55555555555" || 
		str == "66666666666" || 
		str == "77777777777" || 
		str == "88888888888" || 
		str == "99999999999") return 0;

  let arr = []
  for(var i=0;i<str.length;i++) arr[i] = str[i];

  for(var i=0;i<arr.length-2;i++){  v1 = v1 + parseInt(arr[i]) * (arr.length-1-i);  }
  for(var i=0;i<arr.length-1;i++){  v2 = v2 + parseInt(arr[i]) * (arr.length-i);  }

  v1=(v1*10)%11 < 10 ? (v1*10)%11 : 0;
  v2=(v2*10)%11 < 10 ? (v2*10)%11 : 0;

  if (parseInt(str.slice(-2,-1))!=v1 || parseInt(str.slice(-1))!=v2) return 0;
  
  return 1;
}

export const RegisterSchoolForm = () => {
  const [ name, setName ] = useState<string>("");
  const [ nameRes, setNameRes ] = useState<string>("");
  const [ studentsAmount, setStudentsAmount ] = useState<number>();
  const [ cpfRes, setCpfRes ] = useState<number>();
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ emailRes, setEmailRes ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);

  async function handleSignUp(){
    if (loading) return
    
    setLoading(true);
    if (password!=confirmPassword) {
      Swal.fire('Calma lá!','As senhas não estão iguais!','warning')
      setLoading(false);
      return
    }

    let formatCpf = (cpfRes && cpfRes <= 9999999999) ? "0" + String(cpfRes) : String(cpfRes)

    if (formatCpf && !validateCPF(formatCpf)) {
      Swal.fire('CPF Inválido','Digite novamente','error')
      setLoading(false);
      return
    }
    
    await api.post('school', {
      name, nameRes, studentsAmount, cpfRes:formatCpf, password, emailRes, key:process.env.NEXT_PUBLIC_API_KEY
    }).then(()=>{
      Swal.fire('Cadastrado(a) com sucesso!','Faça seu login para acessar os eventos','success')
      setLoading(false);
      Router.push('/')
    }).catch((err)=>{
      err.response.data.message.map((m:string)=>alert(m))
      setLoading(false);
    })

  }

  


  return (
    <section className={styles.container} style={{transform:'translateY(0)'}}>
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
          <span>O número ideal é de <strong>menos de 20 alunos</strong> por cadastro escolar. Caso a sua turma tenha mais de 20 alunos, favor fazer dois cadastros <strong>(com e-mails diferentes)</strong> para poder se inscrever com mais flexibilidade nos eventos. O Cpf do responsável não precisa ser diferente nos cadastros, apenas o email.</span>
        </div>
      </form>

      <div onClick={handleSignUp}><Button text='SALVAR CADASTRO' /></div>
      <div className={styles.loading_container} style={loading?{}:{visibility:'hidden'}}><Spinner /></div>
      <br />
    </section >

  )
}
