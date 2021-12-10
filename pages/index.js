import React, {useState} from 'react';
import ProductList from "../components/ProductList";
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import styles from '../styles/index.module.css';
import woocommerce from "../lib/woocommerce";

//client side rendering
//.env used here
export async function getStaticProps() {
  const { data: products } = await woocommerce.get('products');
  const { data: categories } = await woocommerce.get('products/categories');
  
  return {
    props: {
      categories,
      products,
    },
  };
}

export default function IndexPage({ categories, products }) {
  const [category, setCategory] = useState('All');

  return (
    <>
      <MenuBar/>

      <div className={styles.homePage}>

        {/* Category dropdown */}
        <select className={styles.categoryDropdown} value={category} onChange={event => setCategory(event.target.value)}>
            <option value="All">ALL</option>
            {categories.map((categ) => (
              categ.name == 'Uncategorized' ?
              null
              :
              <option key={categ.id} value={categ.name}>{categ.name.toUpperCase()}</option>
            ))}
        </select>

        <ProductList products={products} category={category} />
        {/* <pre>{JSON.stringify(wooproducts, null, 2)}</pre> */}
        
      </div>
      
      <Footer/>
    </>
  );
}
