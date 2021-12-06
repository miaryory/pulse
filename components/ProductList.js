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
          <Link href={`/products/${product.permalink}`}>
            <a>
              <Product image={product.image.url} name={product.name} price={product.price.formatted_with_code} />
            </a>
          </Link>
        </div>

        :

        product.categories.map((categ) => (
          categ.name == category ?
          <div key={product.permalink}>
            <Link href={`/products/${product.permalink}`}>
              <a>
                <Product image={product.image.url} name={product.name} price={product.price.formatted_with_code} />
              </a>
            </Link>
          </div>
          : null
        ))
      ))}
    </div>
  );
}