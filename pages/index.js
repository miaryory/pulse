import React, {useState} from 'react';
import commerce from "../lib/commerce";
import ProductList from "../components/ProductList";
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import styles from '../styles/index.module.css';

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

export default function IndexPage({ merchant, categories, products }) {
  const [category, setCategory] = useState('All');

  return (
    <>
      <MenuBar/>

      <div className={styles.homePage}>

        {/* Category dropdown */}
        <select className={styles.categoryDropdown} value={category} onChange={event => setCategory(event.target.value)}>
            <option value="All">ALL</option>
            {categories.map((categ) => (
              <option key={categ.id} value={categ.name}>{categ.name.toUpperCase()}</option>
            ))}
        </select>

        <ProductList products={products} category={category} />
        {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
        
        <Footer/>
      </div>
    </>
  );
}
