import Image from 'next/image'
import styles from '../styles/components/Footer.module.css'
import UfesLogo from '../assets/UfesLogo.svg'
import IntrocompLogo from '../assets/IntrocompLogo.svg'
import PETLogo from '../assets/PETLogo.svg'
import CTLogo from '../assets/CT70ANOS.svg'

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.innerContainer}>
        <h3>Realização</h3>
        <div>
          <Image src={UfesLogo} alt="Ufes logo rodape" layout={'responsive'} />
          <Image src={CTLogo} alt="Centro Tecnologico logo rodape" layout="responsive" />
        </div>
      </div>
      <div className={styles.innerContainer}>
        <h3>Apoio</h3>
        <div>
          <Image src={IntrocompLogo} alt="Introcomp logo rodape" layout="responsive" />
          <Image src={PETLogo} alt="PET logo rodape" layout="responsive" />
        </div>
      </div>
    </div>
  )
}
