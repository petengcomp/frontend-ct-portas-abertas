import styles from '../styles/components/NavBar.module.css'
import UfesLogo from '../assets/UfesLogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Head from 'next/head'

interface NavBarProps {
  localPage: string
}

export default function NavBar({localPage}:NavBarProps) {
  const [page,setPage] = useState<string | null>("");

  useEffect(()=>{
    // setPage(localStorage.getItem('CTPORTASABERTASPAGE'))
    setPage(localPage)
  },[])

  return (
    <div className={styles.navbarContainer}>
      <Head>
        <title>CT Portas Abertas - 2022</title>
        <meta name="description" content="Author: PET EngComp, Espaço dedicado à inscrição no evento CT Portas Abertas da UFES"/>
        <meta content="CT Portas Abertas - UFES - ES" property="og:title"></meta>
      </Head>
      <div className={styles.logoContainer}>
        <Image 
          src={UfesLogo}
          alt="Ufes Logo"
          layout={'responsive'}
        />
      </div>
      <ul>
        <Link href="./">
          <li id={page=='index'?styles.selected:""}>PÁGINA INICIAL</li>
        </Link>

        <Link href="./signup">
          <li id={page=='signup'?styles.selected:""}>CADASTRO</li>
        </Link>

        <Link href="./booths">
          <li id={page=='booths'?styles.selected:""}>MOSTRA DE PROJETOS</li>
        </Link>

        <Link href="./events">
          <li id={page=='events'?styles.selected:""}>OFICINAS & TRILHAS</li>
        </Link>

        <Link href="./pockets">
          <li id={page=='pockets'?styles.selected:""}>PALESTRAS POCKET</li>
        </Link>
      </ul>
    </div>
  )
}