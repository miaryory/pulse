import React from 'react';
import Link from "next/link";
import Product from "./Product";
import styles from '../styles/ProductList.module.css';

export default function ProductList({ products, mycategory }) {
  if (!products) return null;

  return (
    <div className={styles.producList}>
      {products.map((product) => (

        mycategory == "All" ?
        <div key={product.permalink}>
          <Link href={`/products/${product.id}`}>
            <a>
              <Product image={product.images[0].src} name={product.name} price={product.price_html} />
            </a>
          </Link>
        </div>

        :

        product.categories.map((categ) => (
          categ.name == mycategory ?
          <div key={product.permalink}>
            <Link href={`/products/${product.id}`}>
              <a>
                <Product image={product.images[0].src} name={product.name} price={product.price_html} />
              </a>
            </Link>
          </div>
          : null
        ))
      ))}
    </div>
  );
}