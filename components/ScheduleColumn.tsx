import EventBox, { EventBoxProps } from "./EventBox";
import styles from '../styles/components/Table.module.css'

interface ScheduleColumnProps {
  startEnd: Array<Date>
  events: Array<EventBoxProps> | null
  subscribedEvents: Array<number>
  setSubscribedEvents: Function
}

export function ScheduleColumn({
  startEnd,
  events,
  subscribedEvents,
  setSubscribedEvents
}:ScheduleColumnProps){

  function handleTimeString(){    
    return (
      `${startEnd[0].getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}:${startEnd[0].getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}
       - 
      ${startEnd[1].getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}:${startEnd[1].getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}`
    )
  }

  return(
    <tr>
      <td>{handleTimeString()}</td>
      <td>
        <div className={styles.EventBoxesContainer}>
          {events?.map((evento:EventBoxProps) => (
            <span key={evento.id}>
              <EventBox
                id={evento.id}
                title={evento.title}
                capacity={evento.capacity}
                filled={evento.filled}
                start={evento.start}
                end={evento.end}
                type={evento.type}
                local={evento.local}
                description={evento.description}
                subscribedEvents={subscribedEvents}
                setSubscribedEvents={setSubscribedEvents}
              />
            </span>
          ))}
        </div>
      </td>
    </tr>
  )
}