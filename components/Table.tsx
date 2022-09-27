import Router from "next/router";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import styles from "../styles/components/Table.module.css";
import { EventBoxProps } from "./EventBox";
import { ScheduleColumn } from "./ScheduleColumn";
import Swal from 'sweetalert2'

interface TableProps {
  selectedEvents: Array<number>
  setSelectedEvents: Function
  showSubscriptions: Boolean
}

export default function Table({selectedEvents, setSelectedEvents, showSubscriptions}:TableProps) {
  const [events, setEvents] = useState<Array<EventBoxProps>>([]);
  const [subEvents, setSubEvents] = useState<Array<EventBoxProps>>([]);
  const [subscribed, setSubscribed] = useState<Array<number>>([]);
  
  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  async function fetchEvents(){
    let subscribedEvents:Array<number> = [];
    const authType = localStorage.getItem('CTPORTASABERTASAUTHTYPE')
    
    try{
      const response = await api.get(`${authType}/events/${localStorage.getItem('CTPORTASABERTASAUTHID')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('CTPORTASABERTASTOKEN')}` }
      })
      response.data?.map((e:EventBoxProps)=>{
        subscribedEvents = [...subscribedEvents, e.id]
      })
      setSubscribed(subscribedEvents)
      setSubEvents(response.data)
    } catch {
      try{
        let response = await api.put('token/refresh', {
          "oldToken":localStorage.getItem('CTPORTASABERTASTOKEN')
        })

        localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token);
        response = await api.get(`${authType}/events/${localStorage.getItem('CTPORTASABERTASAUTHID')}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('CTPORTASABERTASTOKEN')}` }
        })
        response.data?.map((e:EventBoxProps)=>{
          subscribedEvents = [...subscribedEvents, e.id]
        })
        setSubscribed(subscribedEvents)
        setSubEvents(response.data)
      }catch {
        Swal.fire('Erro','Erro ao carregar os eventos inscritos, redirecionando para página inicial...','error')
        Router.push('/')
      }
    }
    
    if(!showSubscriptions){
      try {
        const response = await api.get('events');
        setEvents(response.data)
      } catch(err){
        Swal.fire('Erro','Erro ao carregar os eventos','error')
      }
    } else {
      setEvents(subEvents) 
    }
  }
  
  useEffect(()=>{
    fetchEvents()
  },[showSubscriptions])

  return (
    <div className={styles.EventsContainer}>
      <table className={styles.EventsTable}>
        <tbody>
          <tr>
            <th></th>
            <th>Visitas</th>
            <th>Oficinas</th>
          </tr>

          {times.map((time, index) => (
            <ScheduleColumn
              key={index}
              timeStart={time}
              timeEnd={time + 1}
              visitations={events.filter(
                (item) =>
                  (new Date(item.time).getHours() >= time ) &&
                  (new Date(item.time).getHours() < time + 1) &&
                  (item.type=="visit")
              )}
              workshops={events.filter(
                (item) =>
                  (new Date(item.time).getHours() >= time ) &&
                  (new Date(item.time).getHours() < time + 1) &&
                  (item.type=="workshop")
              )}
              selectedEvents={selectedEvents}
              setSelectedEvents={setSelectedEvents}
              subscribedEvents={subscribed}
              setSubscribedEvents={setSubscribed}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
