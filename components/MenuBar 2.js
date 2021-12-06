import React from 'react';
import styles from '../styles/MenuBar.module.css';
import { FaAlignJustify, FaSearch, FaRegUserCircle, FaShoppingBasket } from "react-icons/fa";

export default function MenuBar(){

    return(
        <div className={styles.menuBar}>
            <div className={styles.menuSection}>
                <div>
                    <FaAlignJustify className={styles.menuIcon} size={30} color={"black"}/>
                </div>
                <div>
                    <h1 className={styles.menuBrand}>PULSE</h1>
                </div>
            </div>

            <div className={styles.menuSection}>
                <div>
                    <FaSearch className={styles.menuIcon}  size={30} color={"black"}/>
                </div>
                <div>
                    <FaRegUserCircle className={styles.menuIcon}  size={30} color={"black"}/>
                </div>
                <div>
                    <FaShoppingBasket className={styles.menuIcon}  size={30} color={"black"}/>
                </div>
            </div>

        </div>
    );

}