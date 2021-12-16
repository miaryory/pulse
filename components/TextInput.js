import styles from '../styles/TextInput.module.css';

export default function TextInput ({label, value, name, onChange, register, required}) {
  
  return(
    <div className={styles.inputDiv}>
      <label className={styles.inputLabel}>{label}</label>
      <input {...register(name, { required })} className={styles.inputField} type={label === "Password" ? "password" : "text"} value={value} onChange={onChange} autoComplete="none"/>
    </div>
  );

}

/*const TextInput = ({ label, value, onChange, register, required }) => (
  <>
    <label className={styles.inputLabel}>{label}</label>
    <input {...register(label, { required })} className={styles.inputField} type={label === "Password" ? "password" : "text"} value={value} onChange={onChange}/>
  </>
);

export default TextInput;*/