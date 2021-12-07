import React from 'react';
import styles from '../styles/MenuBar.module.css';
import { FaAlignJustify, FaSearch, FaRegUserCircle, FaShoppingBasket } from "react-icons/fa";
import Link from 'next/link';
import { useCartState } from '../context/cart';

export default function MenuBar(){

    const { total_unique_items } = useCartState();

    return(
        <div className={styles.menuBar}>
            <div className={styles.menuSection}>
                <div>
                    <FaAlignJustify className={styles.menuIcon} size={30} color={"black"}/>
                </div>
                <div>
                    <Link href="/" passHref>
                        <h1 className={styles.menuBrand}>PULSE</h1>
                    </Link>
                </div>
            </div>

            <div className={styles.menuSection}>
                <div>
                    <FaSearch className={styles.menuIcon}  size={30} color={"black"}/>
                </div>
                <div>
                    <FaRegUserCircle className={styles.menuIcon}  size={30} color={"black"}/>
                </div>
                <div className={styles.cartIcon}>
                    <Link href="/cart" passHref>
                        <FaShoppingBasket className={styles.menuIcon}  size={30} color={"black"}/>
                    </Link>
                    {total_unique_items > 0 ?
                    <div className={styles.itemNumber}>
                    <p>{total_unique_items}</p>
                    </div> 
                    :
                    null
                    }
                    
                </div>
            </div>

        </div>
    );

}