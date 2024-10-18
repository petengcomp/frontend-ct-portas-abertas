import { NextPage } from "next";
import { FiMapPin } from "react-icons/fi";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import HeaderBanner from '../assets/HEADER.png'

import styles from "../styles/pages/Booths.module.css"
import Image from "next/image";


import { URLMAPSCTIV } from "./booths"

const Pockets: NextPage = () =>{

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

    <Footer />
</main>
  )
}

export default Pockets;