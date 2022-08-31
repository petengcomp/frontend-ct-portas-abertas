import React from 'react'
import styles from '../styles/components/RegisterStudentForm.module.css'
import Button from './Button'

export const RegisterStudentForm = () => {
  return (
    <section className={styles.container}>
      <h1>Cadastro aluno</h1>

      <form>
        <div className={styles.leftInputs}>
          <input type={'text'} /><br />
          <label>Nome completo</label><br />

          <input type={'password'} /><br />
          <label>Senha</label><br />

          <input type={'password'} /><br />
          <label>Confirmação de senha</label>
        </div>

        <div>
          <input type={'text'} /><br />
          <label>CPF</label><br />

          <input type={'email'} /><br />
          <label>Email</label><br />
        </div>
      </form>

      <Button text='SALVAR CADASTRO' />
    </section>
  )
}
