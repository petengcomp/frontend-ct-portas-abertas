import { NextPage } from "next";
import NavBar from "../components/NavBar";
import Image from 'next/image';
import styles from '../styles/pages/Speakers.module.css'
import HeaderBanner from '../assets/HEADER.png'
import Footer from "../components/Footer";
import Title from "../components/Title";
import { useEffect } from "react";

const Speakers: NextPage = () => {
    
    useEffect(()=>{
        localStorage.setItem('CTPORTASABERTASPAGE', 'speakers')
    }, [])
    
    return (
        <main className={styles.container}>
            <NavBar />

            <Image src={HeaderBanner} alt="Banner CT Portas Abertas" />

            <Title />

            <h1>Palestrantes</h1>

            <Footer />
        </main>
    )
}

export default Speakers;
    