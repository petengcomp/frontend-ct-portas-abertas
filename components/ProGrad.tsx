import Image from 'next/image'
import styles from '../styles/components/ProGrad.module.css'

import SDCLogo from '../assets/SDCLogo.png'
import PROAECILogo from '../assets/PROAECILogo.png'
import PROGRADLogo from '../assets/PROGRADLogo.png'

export default function ProGrad() {

  const PROGRADURL = "https://prograd.ufes.br/mostra2022"

  return (
    <div className={styles.container} onClick={()=>{window.open(PROGRADURL, '_blank', 'noopener,noreferrer');}}>
      <div><Image src={SDCLogo} alt="Semana Do Conhecimento logo rodape" layout="fill"  objectFit={'contain'} /></div>
      <div><Image src={PROAECILogo} alt="PROAECI logo rodape" layout="fill"  objectFit={'contain'} /></div>
      <div><Image src={PROGRADLogo} alt="PROGRAD logo rodape" layout="fill"  objectFit={'contain'} /></div>
    </div>
  )
}
