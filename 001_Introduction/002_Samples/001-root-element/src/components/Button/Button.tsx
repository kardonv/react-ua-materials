import styles from './styles.module.css';

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    class?: string;}


export default function Button({ text, onClick }: ButtonProps) {    
  return (
    <button className={styles.btn} onClick={() => onClick?.()}>
      { text }
    </button>
  );
}