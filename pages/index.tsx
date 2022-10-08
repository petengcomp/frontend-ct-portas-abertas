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

const Home: NextPage = () => {

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);

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
        response = await api.post('schools/auth/login', {
          "username":email,
          "password":password
        })
        setLoading(false)
      } catch {
        Swal.fire('Login/Senha inválidos','','error')
        setLoading(false)
      }
    }

    if (response && response.data) {
      localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token)
      localStorage.setItem('CTPORTASABERTASAUTHID', response.data.id)
      localStorage.setItem('CTPORTASABERTASAUTHTYPE', response.data.type)
      localStorage.setItem('CTPORTASABERTASAUTHNAME', response.data.name)
      localStorage.setItem('CTPORTASABERTASAMOUNTSTUDENTS', response.data.studentsAmount)
      Router.push('/events')
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

      <h1>Login</h1>

      <form>
        <span>CREDENCIAIS</span>
        <input type={"email"} placeholder={"EMAIL"} onChange={(e)=>setEmail(e.target.value)}/>
        <input type={"password"} placeholder={"SENHA"} onChange={(e)=>setPassword(e.target.value)}/>

        <div className={styles.bottomForm}>
          {/* <span>ESQUECI A SENHA</span> */}
          <br />
          <Link href="./signup">
            <span><FiLogIn size={30} style={{marginRight: '5px'}}/> CADASTRAR</span>
          </Link>
        </div>
      </form>

      <div onClick={handleSubmit}><Button text="FAZER LOGIN" /></div>
      <div className={styles.loading_container} style={loading?{}:{visibility:'hidden'}}><Spinner /></div>
      <Footer />
    </main>
  )
}

export default Home;
