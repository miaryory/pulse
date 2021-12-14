import styles from '../styles/TextInput.module.css';

export default function TextInput ({label, value, onChange}) {

  return(
    <div className={styles.inputDiv}>
      <label className={styles.inputLabel}>{label}</label>
      <input className={styles.inputField} type={label === "Password" ? "password" : "text"} value={value} onChange={onChange} />
    </div>
  );

}