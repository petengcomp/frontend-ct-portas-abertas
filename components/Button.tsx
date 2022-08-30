import styles from '../styles/components/Button.module.css'

interface ButtonProps {
  text: string
}

export default function Button({text}:ButtonProps) {

  return (
    <button className={styles.bt}>{text}</button>
  )
}