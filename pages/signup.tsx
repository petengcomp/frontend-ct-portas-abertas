import { NextPage } from 'next'
import styles from '../styles/pages/SignUp.module.css'
import HeaderBanner from '../assets/HEADER.png'
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Title from '../components/Title';
import { FiUsers, FiUser } from 'react-icons/fi'
import { useState } from 'react';
import { RegisterStudentForm } from '../components/RegisterStudentForm';

const SignUp: NextPage = () => {

  const [signType, setSignType] = useState(-1);

  return (
    <main className={styles.container}>
      <NavBar />

      <Image src={HeaderBanner} alt="Banner CT Portas Abertas" />

      <Title />

      <h1>Formulário de Cadastro</h1>

      <h2>Escolha o tipo de cadastro</h2>

      <div className={styles.signTypeContainer}>
        <div
          className={styles.innerTypeContainer}
          id={signType == 0 ? styles.selected : ""}
          onClick={() => setSignType(signType != 0 ? 0 : -1)}>
          <FiUsers />
          <p>Cadastro Escola</p>
        </div>

        <div className={styles.dividerLineContainer}>
          <div className={styles.dividerLine} />
          <p>OU</p>
          <div className={styles.dividerLine} />
        </div>

        <div
          className={styles.innerTypeContainer}
          id={signType == 1 ? styles.selected : ""}
          onClick={() => setSignType(signType != 1 ? 1 : -1)}>
          <FiUser />
          <p>Cadastro Aluno</p>
        </div>
      </div>

      {
        signType == 0 ? <h1>cadastrando escola</h1> : signType == 1 ? <RegisterStudentForm /> : ""
      }

      <Footer />
    </main>
  )
}

export default SignUp;
