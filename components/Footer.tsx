import Image from 'next/image'
import styles from '../styles/components/Footer.module.css'
import UfesLogo from '../assets/UfesLogo.svg'
import IntrocompLogo from '../assets/IntrocompLogo.svg'
import PETLogo from '../assets/PETLogo.svg'
import CTLogo from '../assets/CT70ANOS.svg'
import NCDLogo from '../assets/NCDLogo.png' 
import PROEXLogo from '../assets/PROEXLogo.png'
import MCTILogo from '../assets/MCTILogo.png'
import CNPQLogo from '../assets/CNPQLogo.png'
import FNDCTLogo from '../assets/FNDCTLogo.png'

import PETMECANICALogo from '../assets/PETMECANICALogo.png'
import PETELETRICALogo from '../assets/PETELETRICALogo.png'

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.innerContainer}>
        <p>Email para contato: <span onClick={()=>{window.location.href = "mailto:mail@example.org";}}>ctportasabertas@ufes.br</span></p>
        <h3>Realização</h3>
        <div className={styles.supportContainer}>
          <div><Image src={UfesLogo} alt="Ufes logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={CTLogo} alt="Centro Tecnologico logo rodape" layout="fill"  objectFit={'contain'} /></div>
        </div>
      </div>
      <div className={styles.innerContainer}>
        <h3>Apoio</h3>
        <div className={styles.colaboratorsContainer}>
          <div><Image src={IntrocompLogo} alt="Introcomp logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={PETLogo} alt="PET logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={NCDLogo} alt="NCD logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={PROEXLogo} alt="PROEX logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={MCTILogo} alt="MCTI logo rodape" layout="fill"  objectFit={'contain'} /></div>
          
        </div>

        <div className={styles.colaboratorsContainer}>
          <div><Image src={CNPQLogo} alt="CNPQ logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={FNDCTLogo} alt="FNDCT logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={PETMECANICALogo} alt="PET Mecanica logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={PETELETRICALogo} alt="PET Eletrica logo rodape" layout="fill"  objectFit={'contain'} /></div>          
        </div>

      </div>
    </div>
  )
}
