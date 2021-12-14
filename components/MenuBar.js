import React from 'react';
import styles from '../styles/MenuBar.module.css';
import { FaAlignJustify, FaSearch, FaRegUserCircle, FaShoppingBasket } from "react-icons/fa";
import { useSelector} from 'react-redux';
import { useRouter } from 'next/router';

export default function MenuBar(){
    const item_count = useSelector((state) => state.cart.item_count);
    const router = useRouter();

    return(
        <div className={styles.menuBar}>
            <div className={styles.menuBarContainer}>
                <div className={styles.menuSection}>
                    <div>
                        <FaAlignJustify className={`${styles.menuIcon} ${styles.burgerMenu}`} size={30} color={"black"}/>
                    </div>
                    <div>
                        <h1 onClick={() => router.push('/')} className={styles.menuBrand}>PULSE</h1>
                    </div>
                </div>

                <div className={styles.menuSection}>
                    <div>
                        <FaSearch className={styles.menuIcon}  size={30} color={"black"}/>
                    </div>
                    <div onClick={() => router.push('/profile')}>
                        <FaRegUserCircle className={styles.menuIcon}  size={30} color={"black"}/>
                    </div>
                    <div className={styles.cartIcon} onClick={() => router.push('/cart')}>
                        <FaShoppingBasket className={styles.menuIcon}  size={30} color={"black"}/>
                        {item_count > 0 ?
                            <div className={styles.itemNumber}>
                            <p>{item_count}</p>
                            </div> 
                        :
                            null
                        }
                    </div>
                </div>
            </div>

        </div>
    );

}