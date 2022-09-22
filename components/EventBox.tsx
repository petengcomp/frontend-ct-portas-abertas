import styles from "../styles/components/EventBox.module.css";

export interface EventBoxProps {
  id: number;
  selected: boolean;
  title: string;
  description?: string;
  capacity: number;
  filled: number;
  time: Date;
  type: string;
  subscribed: boolean;
}

export default function EventBox({
  selected,
  title,
  description,
  capacity,
  filled,
  subscribed
}: EventBoxProps) {
  return (
    <div
      className={styles.EventBoxContainer}
      id={selected?styles.selected:subscribed?styles.subscribed:styles.unselected}
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
