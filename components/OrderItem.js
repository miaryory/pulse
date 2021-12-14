import styles from '../styles/OrderItem.module.css';

export default function OrderItem({number, status, total}){
    return(
        <div className={styles.orderItemContainer}>
            <div>
                <p className={styles.orderHeader}>Order number</p>
                <p>#{number}</p>
            </div>
            <div>
                <p className={styles.orderHeader}>Status</p>
                <p>{status}</p>
            </div>
            <div>
                <p className={styles.orderHeader}>Total</p>
                <p>{total}</p>
            </div>
        </div>
    );
}