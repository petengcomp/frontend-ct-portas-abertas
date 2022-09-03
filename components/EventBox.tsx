import styles from '../styles/components/EventBox.module.css'

interface EventBoxProps {
    titulo: string,
    descricao?: string,
    vagasTotais: number,
    vagas: number,
    color: string
  }

export default function EventBox({ titulo, descricao, vagasTotais, vagas, color }: EventBoxProps) {
    return(
        descricao ?

    <div className={styles.EventBoxContainer} style={{backgroundColor: color}}>
        {titulo}<br/>
        {descricao}<br/>
        {vagas}/{vagasTotais} Vagas Ocupadas
    </div>  
    
    :                                                                                           // talvez essa seja a maior gambiarra já feita...

    <div className={styles.EventBoxContainer} style={{backgroundColor: color}}>
        {titulo}<br/>
        {vagas}/{vagasTotais} Vagas Ocupadas
    </div> 

    )
}