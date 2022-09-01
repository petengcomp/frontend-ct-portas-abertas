import styles from '../styles/components/Table.module.css'
import EventBox from './EventBox'

export default function Table(){
    return(
        <div className={styles.EventsContainer}>
            <table className={styles.EventsTable}>
                <tr>
                    <th></th>
                    <th>Visitas</th>
                    <th>Oficinas</th>
                </tr>
                <tr>
                    <td>07:00-08:00</td>
                    <td>
                        <div className={styles.EventBoxesContainer}>
                            <EventBox titulo='Projeto Solares' vagasTotais={20} vagas={3} color='var(--orange)' />
                            <EventBox titulo='Projeto Aves' vagasTotais={20} vagas={4} color='var(--lightBlue)' />
                            <EventBox titulo='Projeto Sei la' vagasTotais={20} vagas={20} color='var(--lightBlue)' />
                        </div>
                    </td>
                    <td>
                    <div className={styles.EventBoxesContainer}>
                            <EventBox titulo='Projeto Solares' descricao='oioioioioioio' vagasTotais={20} vagas={3} color='var(--orange)' />
                            <EventBox titulo='Projeto Aves' descricao='brabeza' vagasTotais={20} vagas={4} color='var(--lightBlue)' />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>08:00-09:00</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>09:00-10:00</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>10:00-11:00</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>11:00-12:00</td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}