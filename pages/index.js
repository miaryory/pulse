import React, { useState} from 'react';
import ProductList from "../components/ProductList";
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import styles from '../styles/index.module.css';
import woocommerce from "../lib/woocommerce";
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

//server side rendering
//.env used here
export async function getServerSideProps({ query: {page= 1} }){
  const { data: products } = await woocommerce.get('products?per_page=12&page='+page);
  const { data: categories } = await woocommerce.get('products/categories');
  const requestTotal = await woocommerce.get('reports/products/totals');
  let total = 0;

  requestTotal.data.map((t)=>{
    total += t.total
  });

  return {
    props: {
      categories,
      products,
      total,
      page
    },
  };

}

export default function IndexPage({ categories, products, page, total }) {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState('All');
  const router = useRouter();
  const nbOfPages = parseInt(total);
  const lastPage = Math.ceil(nbOfPages / 12);

  const handleCategory = (category) => {
    setCategory(category);
    setSelected(category);
  }

  return (
    <>
      <MenuBar/>

      <div className={styles.homePage}>

        {/* Category dropdown */}
        <div>
          <select className={styles.categoryDropdownMobile} value={category} onChange={event => setCategory(event.target.value)}>
              <option value="All">ALL</option>
              {categories.map((categ) => (
                categ.name == 'Uncategorized' ?
                null
                :
                <option key={categ.id} value={categ.name}>{categ.name.toUpperCase()}</option>
              ))}
          </select>

          <div className={styles.categoryDropdownDesktop}>
              <p className={selected === "All" ? styles.selectedCategory : styles.otherCategories} onClick={() => handleCategory("All")} >ALL</p>
              {categories.map((categ) => (
                categ.name == 'Uncategorized' ?
                null
                :
                <p className={selected === categ.name ? styles.selectedCategory : styles.otherCategories} onClick={() => handleCategory(categ.name)} key={categ.id}>{categ.name.toUpperCase()}</p>
              ))}
          </div>
        </div>

        <div>
          <ProductList products={products} category={category} />

          <div className={styles.paginationContainer}>
            <button key={page} onClick={() => router.push(`/?page=${parseInt(page) - 1}`)} disabled={page <= 1}>
              <FaChevronLeft size={25} color={page <= 1 ? 'grey' : 'black'}/>
            </button>
            <button onClick={() => router.push(`/?page=${parseInt(page) + 1}`)} disabled={page >= lastPage}>
              <FaChevronRight size={25} color={page >= lastPage ? 'grey' : 'black'}/>
            </button>
          </div>
        </div>

      </div>
      
      <Footer/>
    </>
  );
}
