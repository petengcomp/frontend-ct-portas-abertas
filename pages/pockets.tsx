import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { EventBoxProps } from "../components/EventBox";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import HeaderBanner from '../assets/HEADER.png'

import styles from "../styles/pages/Booths.module.css"
import Image from "next/image";
import { api } from "../services/api";


import { URLMAPSCTIV } from "./booths"

const Pockets: NextPage = () =>{
  

  const [ pockets, setPockets ] = useState<Array<EventBoxProps>>();


  async function fetchPockets(){
    const response = await api.post('events', {
      key:process.env.NEXT_PUBLIC_API_KEY
    })

    console.log(response.data)

    let pocketsArray:Array<EventBoxProps> = []
    response.data.map((e:EventBoxProps)=>{
      if (e.type=="pocket") pocketsArray = [...pocketsArray, e]
    })

    setPockets(pocketsArray)
  }

  useEffect(()=>{
    fetchPockets()
    localStorage.setItem('CTPORTASABERTASPAGE', 'pockets')
  }, [])

  return(
    <main className={styles.container}>
    <NavBar localPage={"pockets"} />

    <div className={styles.banner_container}>
      <div className={styles.banner_inside_container}>
        <Image src={HeaderBanner} alt="Banner CT Portas Abertas" layout="responsive"/>
      </div>
    </div>
    
    <h1>PALESTRA DINÂMICA DE CURTA DURAÇÃO</h1>
    <p className={styles.size}>A palestra será ministrada pelo professor André Pacheco com o assunto Inteligência Artificial, e ocorrerá na quarta-feira dia 13, às 10h.
      (<a href="https://www.linkedin.com/in/pacheco-andre/" target="blank">Clique aqui para acessar o Linkedin do André.</a>)</p>
    <div className={styles.subtitle_container}>
      <div>
        <FiMapPin />
        <a href={URLMAPSCTIV} target="_blank" rel="noreferrer"><h2>ESTACIONAMENTO DO CT4</h2></a>
      </div>
    </div>

    <section>
      {
        pockets?.map((b, idx)=>(
          <div key={idx} className={styles.booth_card}>
            <div className={styles.lab_title}>
              <h5>{b.local}</h5>
              <ul>
                <li>{new Date(b.start).toLocaleDateString()}</li>
                <li>{new Date(b.start).toLocaleTimeString()}</li>
              </ul>
            </div>
            <div className={styles.booth_title}><h1>{b.title}</h1></div>
          </div>
        ))
      }

    </section>

    <Footer />
</main>
  )
}

export default Pockets;