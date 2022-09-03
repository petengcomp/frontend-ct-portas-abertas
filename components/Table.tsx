import { useState } from "react";
import styles from "../styles/components/Table.module.css";
import { EventBoxProps } from "./EventBox";
import { ScheduleColumn } from "./ScheduleColumn";

export default function Table() {
  const visitations: Array<EventBoxProps> = [
    {
      id: 1,
      title: "Projeto Solares",
      time: new Date(2022, 9, 2, 7, 0, 0, 0),
      capacity: 20,
      filled: 3,
      selected: false,
    },
    {
      id: 2,
      title: "Projeto Solares",
      time: new Date(2022, 9, 2, 7, 0, 0, 0),
      capacity: 20,
      filled: 0,
      selected: false,
    },
    {
      id: 3,
      title: "Projeto Aves",
      time: new Date(2022, 9, 2, 20, 0, 0, 0),
      capacity: 20,
      filled: 0,
      selected: false,
    },
  ];

  const workshops: Array<EventBoxProps> = [
    {
      id: 4,
      title: "PET Elétrica",
      description: "Oficina de arduino",
      time: new Date(2022, 9, 2, 15, 0, 0, 0),
      capacity: 20,
      filled: 3,
      selected: false,
    },
    {
      id: 5,
      title: "PET Mecânica",
      description: "Oficina de proteses",
      time: new Date(2022, 9, 2, 12, 0, 0, 0),
      capacity: 20,
      filled: 0,
      selected: false,
    },
    {
      id: 6,
      title: "PET Resenhas",
      description: "Clube do livro seila",
      time: new Date(2022, 9, 2, 12, 0, 0, 0),
      capacity: 20,
      filled: 0,
      selected: false,
    },
  ];

  const [selectedEvents, setSelectedEvents] = useState<Array<number>>([]);
  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

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
              visitations={visitations.filter(
                (item) =>
                  item.time.getHours() >= time &&
                  item.time.getHours() < time + 1
              )}
              workshops={workshops.filter(
                (item) =>
                  item.time.getHours() >= time &&
                  item.time.getHours() < time + 1
              )}
              selectedEvents={selectedEvents}
              setSelectedEvents={setSelectedEvents}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
