import { FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import styles from '../styles/components/Switch.module.css'

interface SwitchProps{
  option: Boolean
  setOption: Function
}

export function Switch({option, setOption}:SwitchProps){
  return (
    <div className={styles.switch_container} onClick={()=>setOption(!option)}>
      <div className={styles.switch_toggle}>
        {
          option?(
            <FiToggleRight color={'var(--orange)'}/>
            ) : (
            <FiToggleLeft color={'var(--darkBlue)'}/>
          )
        }
      </div>
      {
        option?(
          <h3>Visualizando <span>MEUS</span> eventos</h3>
          ) : (
          <h2>Visualizando <span>TODOS</span> os eventos</h2>
        )
      }

    </div>
  )
}