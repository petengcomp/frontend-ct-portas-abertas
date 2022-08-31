import styles from '../styles/components/RegisterForms.module.css'
import Button from './Button'

export const RegisterSchoolForm = () => {
  return (
    <section className={styles.container}>
      <h1>Cadastro escola</h1>

      <form>
        <div className={styles.leftInputs}>
          <input type={'text'} /><br />
          <label>Nome da escola</label><br />

          <input type={'text'} /><br />
          <label>Nome do responsável</label><br />

          <input type={'email'} /><br />
          <label>Email do responsável</label><br />

          <input type={'password'} /><br />
          <label>Senha</label><br />

          <input type={'password'} /><br />
          <label>Confirmação de senha</label>
        </div>

        <div>
          <input type={'text'} /><br />
          <label>CPF do responsável</label><br />

          <input type={'email'} /><br />
          <label>Número de alunos</label><br />
        </div>
      </form>

      <Button text='SALVAR CADASTRO' />
      <br />
    </section >

  )
}
