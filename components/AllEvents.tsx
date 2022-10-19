import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { api } from "../services/api";
import { EventBoxProps } from "./EventBox";

import styles from '../styles/pages/Booths.module.css'



export function AllEvents(){

  const [ visits, setVisits ] = useState<Array<EventBoxProps>>();
  const [ workshops, setWorkshops ] = useState<Array<EventBoxProps>>();

  async function fetchEvents(){
    try {
      const response = await api.post('events', {key:process.env.NEXT_PUBLIC_API_KEY})
      let v = response.data.filter((e:EventBoxProps)=>e.type=='visit')
      let w = response.data.filter((e:EventBoxProps)=>e.type=='workshop')
      
      let aux:Array<string> = []
      let wfiltered:Array<EventBoxProps> = []
      w.map((i:EventBoxProps)=>{
        if (!aux.includes(i.title)) {
          aux = [...aux, i.title]
          wfiltered = [...wfiltered, i]
        }
      })

      setVisits(v)
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
      {/* <h1>Trilhas</h1>
      {
        visits?.map((e,idx)=>(
          <h3 key={idx}>{e.title}</h3>
        ))
      } */}

      <h1>OFICINAS PROGRAMADAS</h1>
      
      <section>
        {
          workshops?.map((e,idx)=>(
            <div key={idx} className={styles.booth_card}>
              <div className={styles.lab_title}>
                <h1>{e.local}</h1>
              </div>
              <div className={styles.booth_title}><h1>{e.title}</h1></div>
            </div>
          ))
        }
      </section>
    </div>
  )
}