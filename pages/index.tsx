import { NextPage } from 'next'
import Button from '../components/Button';
import styles from '../styles/pages/Home.module.css'
import { FiLogIn } from 'react-icons/fi'
import HeaderBanner from '../assets/HEADER.png'
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Title from '../components/Title';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <NavBar />

      <Image src={HeaderBanner} alt="Banner CT Portas Abertas"/>

      <Title />

      <form>
        <span>CREDENCIAIS</span>
        <input type={"email"} placeholder={"EMAIL"} />
        <input type={"password"} placeholder={"SENHA"} />

        <div className={styles.bottomForm}>
          <span>ESQUECI A SENHA</span>
          <Link href="./signup">
            <span><FiLogIn size={30} style={{marginRight: '5px'}}/> CADASTRAR</span>
          </Link>
        </div>
      </form>

      <Button text="FAZER LOGIN" />

      <Footer />
    </main>
  )
}

export default Home;
