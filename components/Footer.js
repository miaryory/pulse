import styles from '../styles/Footer.module.css';

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div>
                    <p className={styles.footerHeadear}>PULSE</p>
                    <p>Adress</p>
                    <p>Phone number</p>
                </div>

                <div>
                    <p className={styles.footerHeadear}>HELP</p>
                    <p>FAQ</p>
                    <p>SUPPORT</p>
                </div>

                <div>
                    <p className={styles.footerHeadear}>FOLLOW US</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                </div>
            </div>
        </footer>
    );
}