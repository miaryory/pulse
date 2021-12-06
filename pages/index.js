import React from 'react';
import commerce from "../lib/commerce";
import ProductList from "../components/ProductList";

export default function IndexPage({ merchant, categories, products }) {
  return (
    <>
      <pre>{JSON.stringify(merchant, null, 2)}</pre>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
      <ProductList products={products} />
    </>
  );
}

export async function getStaticProps() {
  const merchant = await commerce.merchants.about();
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      merchant,
      categories,
      products,
    },
  };
}