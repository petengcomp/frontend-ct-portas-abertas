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


const URLMAPSCTIV = "https://www.google.com.br/maps/place/Estacionamento+do+Centro+Tecnol%C3%B3gico+-+Goiabeiras,+Vit%C3%B3ria+-+ES,+29075-053/@-20.2729003,-40.30469,18.17z/data=!4m5!3m4!1s0xb8180667a8685d:0x946655d5089396fd!8m2!3d-20.2725083!4d-40.3047945"

const Booths: NextPage = () =>{
  

  const [ booths, setBooths ] = useState<Array<EventBoxProps>>();


  async function fetchBooths(){
    const response = await api.post('events', {
      key:process.env.NEXT_PUBLIC_API_KEY
    })

    let boothsArray:Array<EventBoxProps> = []
    response.data.map((e:EventBoxProps)=>{
      if (e.type=="booth") boothsArray = [...boothsArray, e]
    })

    setBooths(boothsArray)
  }

  useEffect(()=>{
    fetchBooths()
    localStorage.setItem('CTPORTASABERTASPAGE', 'booths')
  }, [])

  return(
    <main className={styles.container}>
    <NavBar />

    <div className={styles.banner_container}>
      <div className={styles.banner_inside_container}>
        <Image src={HeaderBanner} alt="Banner CT Portas Abertas" layout="responsive"/>
      </div>
    </div>
    
    <h1>ESTANDES DISPONÍVES PARA VISITAÇÃO</h1>
    <div className={styles.subtitle_container}>
      <h2>DE 08:00 ATÉ 17:00</h2>
      <div>
        <FiMapPin />
        <a href={URLMAPSCTIV} target="_blank" rel="noreferrer"><h2>ESTACIONAMENTO DO CT4</h2></a>
      </div>
    </div>

    <section>
      {
        booths?.map((b, idx)=>(
          <div key={idx} className={styles.booth_card}>
            <div className={styles.lab_title}><h1>{b.local}</h1></div>
            <div className={styles.booth_title}><h1>{b.title}</h1></div>
          </div>
        ))
      }

    </section>

    <Footer />
</main>
  )
}

export default Booths;