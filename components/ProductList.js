import React from 'react';
import Link from "next/link";
import Product from "./Product";
import styles from '../styles/ProductList.module.css';

export default function ProductList({ products, category }) {
  if (!products) return null;

  return (
    <div className={styles.producList}>
      {products.map((product) => (

        category == "All" ?
        <div key={product.permalink}>
          <Link href={`/products/${product.id}`}>
            <a>
              <Product image={product.images[0].src} name={product.name} price={product.price_html} />
            </a>
          </Link>
        </div>

        :

        product.categories.map((categ) => (
          categ.name == category ?
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