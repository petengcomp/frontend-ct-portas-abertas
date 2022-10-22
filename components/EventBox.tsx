import Router from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { OpenDate } from "../pages";
import { api } from "../services/api";
import { CheckUser, User } from "../services/checkuser";
import styles from "../styles/components/EventBox.module.css";

export interface EventBoxProps {
  id: number;
  title: string;
  description?: string;
  local?:string;
  capacity: number;
  filled: number;
  start: Date;
  end: Date;
  type: string;
  subscribedEvents: Array<number>;
  setSubscribedEvents: Function;
}

export default function EventBox({
  id,
  title,
  local,
  start,
  description,
  capacity,
  filled,
  subscribedEvents,
  setSubscribedEvents
}: EventBoxProps) {

  const [filledUpdatable, setFilled] = useState<number>(filled);
  
  async function handleConfirmationInscription(){
    if (subscribedEvents.includes(id)) {
      unsubscribe()
      return
    }

    const result = await Swal.fire({
      title: `${title}`,
      html:
        `
        <p><b>${local}</b> - ${new Date(start).toLocaleDateString()} - ${new Date(start).toLocaleTimeString()}</p>
        <p style="text-align: justify">${description}</p>
        
        `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: 'var(--darkBlue)',
      confirmButtonText: 'Se inscrever',
    })

    if (result.isConfirmed){
      if (new Date() < OpenDate) {
        Swal.fire(
          'Quase lá',
          'As inscrições de atividades do evento CT de Portas Abertas abrem no dia 01/11/2022.',
          'info'
        )
        return
      }

      await subscribe()
    } else return

  }

  async function subscribe(){   
    //check for user
    let user:User|undefined = CheckUser()
    if (!user) return

    try {
        const response = await api.patch(`${user.authType}/add-event/${user.authId}`, {
            "event": { "id": id } 
        }, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    } catch {
        //if token is invalid, it to refreshes it

        let response:any = await api.put('token/refresh', {
            "oldToken":localStorage.getItem('CTPORTASABERTASTOKEN')
        })

        localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token);
        user.token = response.data.access_token

        //with new token we try the request again
        try{
            response = await api.patch(`${user.authType}/add-event/${user.authId}`, {
                "event": { "id": id } 
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            })
        } catch(error:any) {
            Swal.fire('Houve um erro na inscrição', error.response.data.message, 'warning')
            return
        }
    }
    setSubscribedEvents([...subscribedEvents, id])
    setFilled(filledUpdatable+1)
  }

  async function unsubscribe(){
    let user:User|undefined = CheckUser()    
    if (!user) return;
    
    try{
      const response = await api.post(`events/${id}`, {
        key: process.env.NEXT_PUBLIC_API_KEY
      })
   
      const result = await Swal.fire({
        title: `${title}`,
        html:
          `
          <p><b>${local}</b> - ${new Date(start).toLocaleDateString()} - ${new Date(start).toLocaleTimeString()}</p>
          <p style="text-align: justify">${description}</p>
          
          `,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Desinscrever',
        confirmButtonColor: '#d33'
      })
  
      if (result.isConfirmed){
        try{
          await api.patch(`${user.authType}/remove-event/${user.authId}`, {
            "event": { "id": id } 
          }, {
            headers: { Authorization: `Bearer ${user.token}` }
          })
          
        } catch {
          try{
            const response = await api.put('token/refresh', {
              "oldToken":user.token
            })
    
            localStorage.setItem('CTPORTASABERTASTOKEN', response.data.access_token);
            user.token = response.data.access_token
  
            await api.patch(`${user.authType}/remove-event/${user.authId}`, {
              "event": { "id": id } 
            }, {
              headers: { Authorization: `Bearer ${user.token}` }
            })
    
          } catch(err:any) {
            Swal.fire('Ocorreu um problema',err.response.data.message,'warning')
          }
        }
      } else return
    } catch (err:any) {
      Swal.fire('Ocorreu um problema',err.response.data.message,'warning')
    }
    setSubscribedEvents(subscribedEvents.filter(e=>e!=id))
    setFilled(filledUpdatable-1)
  }

  return (
    <div className={styles.EventBoxContainer} id={subscribedEvents.includes(id)?styles.subscribed:''} onClick={()=>handleConfirmationInscription()}>
      <ul>
        <li>{title}</li>
        <li>
          {filledUpdatable}/{capacity} Vagas Ocupadas
        </li>
      </ul>
    </div>
  );
}
