import styles from "../styles/components/EventBox.module.css";

export interface EventBoxProps {
  id: number;
  selected: boolean;
  title: string;
  description?: string;
  capacity: number;
  filled: number;
  time: Date;
}

export default function EventBox({
  selected,
  title,
  description,
  capacity,
  filled,
}: EventBoxProps) {
  return (
    <div
      className={styles.EventBoxContainer}
      id={selected?styles.selected:styles.unselected}
    >
      <ul>
        <li>{title}</li>
        {description ? <li>{description}</li> : ""}
        <li>
          {filled}/{capacity} Vagas Ocupadas
        </li>
      </ul>
    </div>
  );
}
