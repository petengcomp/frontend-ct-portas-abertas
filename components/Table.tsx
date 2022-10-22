import Router from "next/router";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { EventBoxProps } from "./EventBox";
import { ScheduleColumn } from "./ScheduleColumn";
import Swal from 'sweetalert2'

import styles from "../styles/components/Table.module.css";
import { CheckUser, User } from "../services/checkuser";

interface TableProps {
  showSubscriptions: Boolean
  day: number
  type: string
}

export default function Table({showSubscriptions, day, type}:TableProps) {
  const [events, setEvents] = useState<Array<EventBoxProps>>([]);
  
  const [subscribedEvents, setSubscribedEvents] = useState<Array<number>>([]);
  const [schedules, setSchedules] = useState<Array<Array<Date>>>([]);
  
  function loadSchedules() {
    let times = []; 
    let start = new Date();

    if (day==22) start = new Date("2022-11-22T08:00:00.000Z"); //GMT (Brasilia +3 ex: 6h BR == 9h GMT)
    else if (day==23) start = new Date("2022-11-23T08:00:00.000Z"); //GMT (Brasilia +3 ex: 6h BR == 9h GMT)

    for(var i = 0;i<10; i++) {
      let end = new Date(start.getTime())
      end.setMinutes(end.getMinutes() + 90)
      times[i] = [
        new Date(start.getTime()),
        new Date(end.getTime())
      ]
      start.setMinutes(start.getMinutes() + 90)
    }
    setSchedules(times);
  }

  async function fetchEvents(){
    //calling both requests here because we're using 'filled' update on fetchUserEvents
    const userEvents = await fetchUserEvents()
    const allEvents = await fetchAllEvents()
    
    if (showSubscriptions && userEvents) {
      setEvents(userEvents)
    } else if (allEvents) {
      setEvents(allEvents)
    }
  }

  async function fetchUserEvents(){
    //checking for user
    let user:User|undefined = CheckUser()
    if (!user) return

    //try get the user's events with current token
    let subscribed:Array<number> = [];
    try{
      const response = await api.get(`${user.authType}/events/${user.authId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      response.data?.map((e:EventBoxProps)=>{
        if (e.type==type) subscribed = [...subscribed, e.id]
      })
      setSubscribedEvents(subscribed)
      return response.data
    
    //try refreshing the token if is not valid
    } catch {
      try{
        let response = await api.put('token/refresh', {
          "oldToken":localStorage.getItem('CTPORTASABERTASTOKEN')
        })

        localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token);

        user.token = response.data.access_token

        //new request with new token
        response = await api.get(`${user.authType}/events/${user.authId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })

        response.data?.map((e:EventBoxProps)=>{
          subscribed = [...subscribed, e.id]
        })

        setSubscribedEvents(subscribed)
        return response.data

      } catch (err:any) {
        Swal.fire('Ops','Nenhuma conta logada, redirecionando...' + err.response.data.message,'warning')
        Router.push('/')
        return
      }
    }
  }
  
  
  async function fetchAllEvents(){
    
    //checking for user
    let user:User|undefined = CheckUser()
    if (!user) return

    try {      
      const response = await api.post('events',{
        key:process.env.NEXT_PUBLIC_API_KEY
      });
      
      let eventsFiltered:Array<EventBoxProps> = []
      response.data?.map((e:EventBoxProps)=>{
        if (e.type==type) eventsFiltered = [...eventsFiltered, e]
      })
      
      return eventsFiltered

    } catch(err:any){
      Swal.fire('Ops','Erro ao carregar os eventos ' + err.response.data.message,'warning')
      return
    }
  }
  
  useEffect(()=>{
    fetchEvents()
    loadSchedules()
  },[showSubscriptions, day])

  return (
    <div className={styles.EventsContainer}>
      <table className={styles.EventsTable}>
        <tbody>
          {schedules.map((startEnd, index) => (
            <ScheduleColumn
              key={index}
              startEnd={startEnd}
              events={events.filter(
                (item) =>
                  (new Date(item.start)<startEnd[1]) &&
                  // TODO: add end time to backend to remove 1h30min fixed time
                  (new Date((new Date(item.start)).getTime() + 90*60*1000)>startEnd[0])
              )}
              subscribedEvents={subscribedEvents}
              setSubscribedEvents={setSubscribedEvents}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
