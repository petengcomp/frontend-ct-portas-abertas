import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { api } from "../services/api";
import { EventBoxProps } from "./EventBox";

import styles from '../styles/pages/Booths.module.css'

interface WorkshopsProps extends EventBoxProps {
  timeArray: Array<Date>
}

export function AllEvents(){

  const [ workshops, setWorkshops ] = useState<Array<WorkshopsProps>>();

  async function fetchEvents(){
    try {
      const response = await api.post('events', {key:process.env.NEXT_PUBLIC_API_KEY})
      let w = response.data.filter((e:EventBoxProps)=>e.type=='workshop')
      
      let wfiltered:Array<WorkshopsProps> = []

      w.map((i:EventBoxProps)=>{
        let extendedWorkshop = {...i, timeArray: [i.time]}
        let found = wfiltered.find((e)=>e.title==i.title)

        if (!found) {
          wfiltered = [...wfiltered, extendedWorkshop]
        } else {
          let idx = wfiltered.indexOf(found)
          found.timeArray = [...found.timeArray, i.time]
          wfiltered[idx] = found
        }
      })

      setWorkshops(wfiltered)
    } catch(err:any){
      Swal.fire('Erro', 'Houve um problema na conexão com o banco de dados. ' + err.response.data.message,'error')
    }
  }

  useEffect(()=>{
    fetchEvents()
  }, [])

  if (!workshops) return (<></>)

  return (
    <div className={styles.container}>
      <h1>OFICINAS PROGRAMADAS</h1>
      
      <section>
        {
          workshops?.map((e,idx)=>(
            <div key={idx} className={styles.booth_card}>
              <div className={styles.lab_title}>
                <h1>{e.local}</h1>
              </div>
              <div className={styles.booth_title}>
                <ul className={styles.scheduleContainer}>
                  { 
                    e.timeArray.map((t, id)=>(<li key={id}>{new Date(t).toLocaleDateString()} - {new Date(t).toLocaleTimeString()}</li>))
                  }
                </ul>
                
                <h1>{e.title}</h1>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  )
}