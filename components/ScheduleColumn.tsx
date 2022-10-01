import EventBox, { EventBoxProps } from "./EventBox";

import styles from '../styles/components/Table.module.css'
import { api } from "../services/api";
import Router from "next/router";
import Swal from "sweetalert2";

interface ScheduleColumnProps {
  startEnd: Array<Date>
  visitations: Array<EventBoxProps> | null
  workshops: Array<EventBoxProps> | null
  selectedEvents: Array<number>
  setSelectedEvents: Function
  subscribedEvents: Array<number>
  setSubscribedEvents: Function
}

export function ScheduleColumn({
  startEnd,
  visitations,
  workshops,
  selectedEvents,
  setSelectedEvents,
  subscribedEvents,
  setSubscribedEvents
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
    
    return (
      `${startEnd[0].getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}:${startEnd[0].getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}
       - 
      ${startEnd[1].getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}:${startEnd[1].getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}`
    )
  }

  async function unsubscribe(id:number){
    const authType = localStorage.getItem('CTPORTASABERTASAUTHTYPE')
    const response = await api.get(`events/${id}`)
    
    
    const result = await Swal.fire({
      title:`Desinscrever do evento ${response.data.title} ?`,
      showCancelButton: true,
      confirmButtonText: 'Desinscrever',
    })

    if (result.isConfirmed){
      try{
        await api.patch(`${authType}/remove-event/${localStorage.getItem('CTPORTASABERTASAUTHID')}`, {
          "event": { "id": id } 
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('CTPORTASABERTASTOKEN')}` }
        })
        setSubscribedEvents(subscribedEvents.filter(e=>e!=id))
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
  
          setSubscribedEvents(subscribedEvents.filter(e=>e!=id))
        } catch {
          Swal.fire('Error','Erro ao se desinscrever do evento','error')
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