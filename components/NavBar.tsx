import styles from '../styles/components/NavBar.module.css'
import UfesLogo from '../assets/UfesLogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'



export default function NavBar() {
  const [page,setPage] = useState<string | null>("");

  useEffect(()=>{
    setPage(localStorage.getItem('CTPORTASABERTASPAGE'))
  },[])

  return (
    <div className={styles.navbarContainer}>
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

        <Link href="./events">
          <li id={page=='events'?styles.selected:""}>PROGRAMAÇÃO</li>
        </Link>

        <Link href="./speakers">
          <li id={page=='speakers'?styles.selected:""}>PALESTRANTES</li>
        </Link>

        <Link href="./signup">
          <li id={page=='signup'?styles.selected:""}>CADASTRO</li>
        </Link>
      </ul>
    </div>
  )
}