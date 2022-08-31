import styles from '../styles/components/NavBar.module.css'
import UfesLogo from '../assets/UfesLogo.svg'
import Image from 'next/image'
import Link from 'next/link'



export default function NavBar() {

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
          <li id={styles.selected}>PÁGINA INICIAL</li>
        </Link>
        <li>PROGRAMAÇÃO</li>
        <li>PALESTRANTES</li>
        <Link href="./signup">
          <li>CADASTRO</li>
        </Link>
      </ul>
    </div>
  )
}