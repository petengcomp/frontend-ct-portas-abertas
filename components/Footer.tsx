import Image from 'next/image'
import styles from '../styles/components/Footer.module.css'
import UfesLogo from '../assets/UfesLogo.svg'
import IntrocompLogo from '../assets/IntrocompLogo.svg'
import PETLogo from '../assets/PETLogo.svg'
import CTLogo from '../assets/CT70ANOS.svg'
import FESTLogo from '../assets/FEST.svg' 
import PROEXLogo from '../assets/PROEXLogo.png'
import FINDESLogo from '../assets/FINDES.svg'
import CtJuniorLogo from '../assets/CT Júnior.svg'
import VitoriaBajaLogo from '../assets/Vitória Baja Branca.png'
import CREALogo from '../assets/CREALogo.png'
import SEELogo from '../assets/SEELogo.png'
import PETMECANICALogo from '../assets/PETMECANICALogo.png'
import PETELETRICALogo from '../assets/PETELETRICALogo.png'
import SolaresLogo from '../assets/Projeto Solares.png'

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.innerContainer}>
        CT de Portas Abertas
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
          <div><Image src={FESTLogo} alt="FEST logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={PROEXLogo} alt="PROEX logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={FINDESLogo} alt="FINDES logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={CREALogo} alt="CREA logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={SEELogo} alt="SEE logo rodape" layout="fill"  objectFit={'contain'} /></div>
        </div>

        <div className={styles.colaboratorsContainer}>
          <div><Image src={IntrocompLogo} alt="Introcomp logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={PETLogo} alt="PET logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div id={styles.petmeclogo}><Image src={PETMECANICALogo} alt="PET Mecanica logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={PETELETRICALogo} alt="PET Eletrica logo rodape" layout="fill"  objectFit={'contain'} /></div>          
        </div>

        <div className={styles.colaboratorsContainer}>
          <div><Image src={CtJuniorLogo} alt="CtJunior logo rodape" layout="fill"  objectFit={'contain'} /></div>
          <div><Image src={VitoriaBajaLogo} alt="VitoriaBaja logo rodape" layout="fill"  objectFit={'contain'}/></div>
          <div><Image src={SolaresLogo} alt="Solares logo rodape" layout="fill"  objectFit={'contain'} /></div>
        </div>

      </div>
    </div>
  )
}
