import styles from '../styles/components/NavBar.module.css'
import UfesLogo from '../assets/UfesLogo.svg'
import Image from 'next/image'



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
        <li id={styles.selected}>PÁGINA INICIAL</li>
        <li>PROGRAMAÇÃO</li>
        <li>PALESTRANTES</li>
        <li>CADASTRO</li>
      </ul>
    </div>
  )
}