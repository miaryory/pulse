import styles from '../styles/TextInput.module.css';

export default function TextInput ({label, value, onChange}) {

  return(
    <div className={styles.inputDiv}>
      <label>{label}</label>
      <input className={styles.inputField} type="text" value={value} onChange={onChange} />
    </div>
  );

}