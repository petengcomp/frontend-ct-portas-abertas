import { NextPage } from 'next'
import styles from '../styles/pages/Home.module.css'

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <h1>ct de portas abertas ufes 2022</h1>

      <form>
        <span>credenciais</span>
        <input type={"email"} placeholder={"email"} />
        <input type={"password"} placeholder={"senha"} />

        <div className={styles.bottomForm}>
          <span>esqueci a senha</span>
          <span>cadastrar</span>
        </div>
      </form>

      <button>
        fazer login
      </button>
    </main>
  )
}

export default Home;
