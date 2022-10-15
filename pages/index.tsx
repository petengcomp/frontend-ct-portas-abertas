import { NextPage } from 'next'
import Button from '../components/Button';
import styles from '../styles/pages/Home.module.css'
import { FiLogIn } from 'react-icons/fi'
import HeaderBanner from '../assets/HEADER.png'
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Router from 'next/router';
import Swal from 'sweetalert2'
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { AllEvents } from '../components/AllEvents';

const Home: NextPage = () => {

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ passwordForgotten, setPasswordForgotten ] = useState<number>(0);
  const [ newPassword, setNewPassword ] = useState<string>("");

  async function handleForgotten(){
    if (loading) return
    setLoading(true)    
    try{
      await api.post("student/recover-password", {emailRes:email})
    } catch (err:any){
      try {
        await api.post("school/recover-password", {emailRes:email}) 
      }catch(err:any){
        Swal.fire('Erro no email informado',`${err.response.data.message}`,'error')
        setLoading(false)
        return
      }
    }

    Swal.fire('Sucesso!','Sua senha foi enviada para você no seu email. (Talvez leve alguns minutos até você recebê-la)','success')
    setPassword("")
    setNewPassword("")
    setPasswordForgotten(2)

    setLoading(false)
  }

  async function handleChangePassword() {
    if (loading) return
    setLoading(true)

    const login = await handleSubmit()
    if (!login) return

    const type = localStorage.getItem('CTPORTASABERTASAUTHTYPE')
    const id = localStorage.getItem('CTPORTASABERTASAUTHID')
    const bearer = localStorage.getItem('CTPORTASABERTASTOKEN')
    
    try{
      if (!type || !id) throw Error("Dados de login faltantes")

      await api.patch(`${type}/update-password/${id}`, {password:newPassword}, {headers: { Authorization: `Bearer ${bearer}` }})
      Swal.fire('Sucesso!','Sua senha foi resetada','success')
      setEmail("")
      setPassword("")
      setNewPassword("")
      setPasswordForgotten(0)
    } catch (err:any){
      Swal.fire('Erro na nova senha informada ',`${err.response.data.message}`,'error')
    }


    setLoading(false)
  }
  
  
  async function handleSubmit(){
    if (loading) return

    setLoading(true)
    let response:any

    try{
      response = await api.post('student/auth/login', {
        "username":email,
        "password":password
      })
      setLoading(false)
    } catch(err) {
      try {
        response = await api.post('school/auth/login', {
          "username":email,
          "password":password
        })
        setLoading(false)
      } catch {
        Swal.fire('Login/Senha inválidos','','error')
        setLoading(false)
        return 0;
      }
    }

    if (response && response.data) {
      localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token)
      localStorage.setItem('CTPORTASABERTASAUTHID', response.data.id)
      localStorage.setItem('CTPORTASABERTASAUTHTYPE', response.data.type)
      localStorage.setItem('CTPORTASABERTASAUTHNAME', response.data.name)
      localStorage.setItem('CTPORTASABERTASAMOUNTSTUDENTS', response.data.studentsAmount) 
      return 1;
    }
  }

  useEffect(()=>{
    localStorage.setItem('CTPORTASABERTASPAGE', 'index')
  },[])

  return (
    <main className={styles.container}>
      <NavBar />

      <div className={styles.banner_container}>
        <div className={styles.banner_inside_container}>
          <Image src={HeaderBanner} alt="Banner CT Portas Abertas" layout="responsive"/>
        </div>
      </div>

      <AllEvents />

      <h1>Login</h1>

      {passwordForgotten?<span onClick={()=>setPasswordForgotten(0)} style={{cursor:'pointer'}}>Voltar</span>:""}

      {
        passwordForgotten==1?(
          <form>
            <span>INSIRA O EMAIL PARA RECUPERAÇÃO</span>
            <input type={"email"} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          </form>
        ):passwordForgotten==2?(
          <form>
            <span>INSIRA A SENHA ANTIGA</span>
            <input type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

            <span>INSIRA A NOVA SENHA</span>
            <input type={"password"} value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
          </form>
        ):(
          <form>
            <span>CREDENCIAIS</span>
            <input type={"email"} placeholder={"EMAIL"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type={"password"} placeholder={"SENHA"} value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <div className={styles.bottomForm}>
              <span onClick={()=>setPasswordForgotten(1)}>ESQUECI A SENHA</span>
              <br />
              <Link href="./signup">
                <span><FiLogIn size={30} style={{marginRight: '5px'}}/> CADASTRAR</span>
              </Link>
            </div>
          </form>
        )
      }
      
      

      <div 
        onClick={passwordForgotten==1
          ?()=>handleForgotten()
          :passwordForgotten==2
          ?()=>handleChangePassword()
          :()=>{handleSubmit(); Router.push("/events")}}>

        <Button text={passwordForgotten==1?"RECUPERAR SENHA":passwordForgotten==2?"SALVAR NOVA SENHA":"FAZER LOGIN"} />
      </div>
      <div className={styles.loading_container} style={loading?{}:{visibility:'hidden'}}><Spinner /></div>
      <Footer />
    </main>
  )
}

export default Home;
