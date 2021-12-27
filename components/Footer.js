import styles from '../styles/Footer.module.css';
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div>
                    <p className={styles.footerHeadear}>PULSE</p>
                    <p>MIARY ORY</p>
                    <p>WEB DEVELOPMENT</p>
                    <p>KEA</p>
                </div>

                <div>
                    <p className={styles.footerHeadear}>HELP</p>
                    <p>FAQ</p>
                    <p>SUPPORT</p>
                    <p>CONTACT US</p>
                </div>

                <div>
                    <p className={styles.footerHeadear}>FOLLOW US</p>
                    <p>
                        <FaFacebook size={25} color={"grey"}/>
                    </p>
                    <p>
                        <FaInstagram size={25} color={"grey"}/>
                    </p>
                </div>
            </div>
        </footer>
    );
}