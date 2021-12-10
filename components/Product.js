import React from 'react';
import Image from 'next/image';
import styles from '../styles/Product.module.css';

export default function Product({ image, name, price }) {
    return (
        <div className={styles.productContainer} >

            <div className={styles.productImage} >
                <Image src={image} alt='Product' width={200} height={200} />
            </div>

            <p className={styles.productName}>{name.toUpperCase()}</p>
        
            <p className={styles.productPrice} dangerouslySetInnerHTML={{__html: price}}></p>
            
        </div>
    );
}