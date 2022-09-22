import EventBox, { EventBoxProps } from "./EventBox";

import styles from '../styles/components/Table.module.css'
import { api } from "../services/api";
import Router from "next/router";

interface ScheduleColumnProps {
  timeStart:number
  timeEnd:number
  visitations: Array<EventBoxProps> | null
  workshops: Array<EventBoxProps> | null
  selectedEvents: Array<number>
  setSelectedEvents: Function
  subscribedEvents: Array<number>
}

export function ScheduleColumn({
  timeStart,
  timeEnd,
  visitations,
  workshops,
  selectedEvents,
  setSelectedEvents,
  subscribedEvents
}:ScheduleColumnProps){
  
  function handleSelection(id: number) {
    if (subscribedEvents.includes(id)) {
      unsubscribe(id)
      return
    }
    
    if (selectedEvents.includes(id))
      setSelectedEvents(selectedEvents.filter((item) => item != id));
    else setSelectedEvents([...selectedEvents, id]);
  }

  function handleTimeString(){
    let string = ""
    if (timeStart<=9) string += `0${timeStart}`
    else string += timeStart
    string+=':00-'
    if (timeEnd<=9) string += `0${timeEnd}`
    else string += timeEnd
    string+=':00'
    return string
  }

  async function unsubscribe(id:number){
    const authType = localStorage.getItem('CTPORTASABERTASAUTHTYPE')
    if (confirm(`Desinscrever do evento ${id} ?`)) {
      try{
        await api.patch(`${authType}/remove-event/${localStorage.getItem('CTPORTASABERTASAUTHID')}`, {
          "event": { "id": id } 
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('CTPORTASABERTASTOKEN')}` }
        })
        alert('Evento removido!')
        Router.reload()
      } catch {
        try{
          const response = await api.put('token/refresh', {
            "oldToken":localStorage.getItem('CTPORTASABERTASTOKEN')
          })
  
          localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token);
          await api.patch(`${authType}/remove-event/${localStorage.getItem('CTPORTASABERTASAUTHID')}`, {
            "event": { "id": id } 
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('CTPORTASABERTASTOKEN')}` }
          })
  
          alert('Evento removido!')
          Router.reload()
        } catch {
          alert('Impossível se desinscrever do evento')
        }
      }
    }
  }

  return(
    <tr>
      <td>{handleTimeString()}</td>
      <td>
        <div className={styles.EventBoxesContainer}>
          {visitations?.map((evento:EventBoxProps) => (
            <span
              key={evento.id}
              onClick={()=>handleSelection(evento.id)}>
              <EventBox
                id={evento.id}
                selected={selectedEvents.includes(evento.id)}
                title={evento.title}
                capacity={evento.capacity}
                filled={evento.filled}
                time={evento.time}
                type={evento.type}
                subscribed={subscribedEvents.includes(evento.id)}
              />
            </span>
          ))}
        </div>
      </td>
      <td>
        <div className={styles.EventBoxesContainer}>
          {workshops?.map((evento) => (
            <span
              key={evento.id}
              onClick={()=>handleSelection(evento.id)}>
              <EventBox
                id={evento.id}
                selected={selectedEvents.includes(evento.id)}
                title={evento.title}
                description={evento.description}
                capacity={evento.capacity}
                filled={evento.filled}
                time={evento.time}
                type={evento.type}
                subscribed={subscribedEvents.includes(evento.id)}
              />
            </span>
          ))}
        </div>
      </td>
    </tr>
  )
}