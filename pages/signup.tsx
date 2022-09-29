import { NextPage } from 'next'
import styles from '../styles/pages/SignUp.module.css'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { FiUsers, FiUser } from 'react-icons/fi'
import { useEffect, useState } from 'react';
import { RegisterStudentForm } from '../components/RegisterStudentForm';
import { RegisterSchoolForm } from '../components/RegisterSchoolForm';

const SignUp: NextPage = () => {

  const [signType, setSignType] = useState(-1);

  useEffect(()=>{
    localStorage.setItem('CTPORTASABERTASPAGE', 'signup')
  }, [])

  return (
    <main className={styles.container}>
      <NavBar />

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

      <div className={styles.formContainer}>
        {
          signType == 0 ? <RegisterSchoolForm /> : signType == 1 ? <RegisterStudentForm /> : ""
        }
      </div>
      <Footer />
    </main>
  )
}

export default SignUp;
