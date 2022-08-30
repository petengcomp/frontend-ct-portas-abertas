import Image from 'next/image'
import styles from '../styles/components/Footer.module.css'
import UfesLogo from '../assets/UfesLogo.svg'
import IntrocompLogo from '../assets/IntrocompLogo.svg'
import PETLogo from '../assets/PETLogo.svg'

export default function Footer() {


  return (
    <div className={styles.footerContainer}>
      <div className={styles.upperContainer}>
        <h3>Realização</h3>
        <Image src={UfesLogo} alt="Ufes logo rodape" layout={'responsive'}/>
      </div>
      <div className={styles.lowerContainer}>
        <h3>Apoio</h3>
        <div>
          <Image src={IntrocompLogo} alt="Introcomp logo rodape" layout="responsive"/>
          <Image src={PETLogo} alt="PET logo rodape" layout="responsive"/>
        </div>
      </div>
    </div>
  )
}