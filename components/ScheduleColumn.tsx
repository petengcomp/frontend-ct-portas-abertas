import EventBox, { EventBoxProps } from "./EventBox";

import styles from '../styles/components/Table.module.css'

interface ScheduleColumnProps {
  timeStart:number
  timeEnd:number
  visitations: Array<EventBoxProps>
  workshops: Array<EventBoxProps>
  selectedEvents: Array<number>
  setSelectedEvents: Function
}

export function ScheduleColumn({
  timeStart,
  timeEnd,
  visitations,
  workshops,
  selectedEvents,
  setSelectedEvents
}:ScheduleColumnProps){
  

  function handleSelection(id: number) {
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
              />
            </span>
            
          ))}
        </div>
      </td>
    </tr>
  )
}