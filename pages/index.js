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
export async function getServerSideProps({ res, query: {page = 1, category = ''} }){
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const { data: products } = await woocommerce.get('products?per_page=12&page='+page+'&category='+category);
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
      page,
      category
    },
  };

}

export default function IndexPage({ categories, products, total, page, category }) {
  const [mycategory, setCategory] = useState('All');
  const [selected, setSelected] = useState('All');
  const router = useRouter();
  let nbOfPages = 0;
  if(category == ''){
    nbOfPages = parseInt(total);
  }
  else{
    nbOfPages = parseInt(products.length);
  }

  const lastPage = Math.ceil(nbOfPages / 12);
  //console.log(categories);

  const handleCategory = (name, id) => {
    setCategory(name);
    setSelected(name);
    router.push(`/?page=1&category=${id}`);
  }

  const handleCategoryMobile = (id) =>{
    router.push(`/?page=1&category=${id}`);
  }

  return (
    <>
      <MenuBar/>

      <div className={styles.homePage}>

        {/* Category dropdown 
        //onChange={event => setCategory(event.target.value)}*/}
        <div>
          <select className={styles.categoryDropdownMobile} onChange={event => handleCategoryMobile(event.target.value)}>
              <option value="">ALL</option>
              {categories.map((categ) => (
                categ.name == 'Uncategorized' ?
                null
                :
                <option key={categ.id} value={categ.id}>{categ.name.toUpperCase()}</option>
              ))}
          </select>

          <div className={styles.categoryDropdownDesktop}>
              <p className={selected === "All" ? styles.selectedCategory : styles.otherCategories} onClick={() => handleCategory('All', '')}>ALL</p>
              {categories.map((categ) => (
                categ.name == 'Uncategorized' ?
                null
                :
                //onClick={() => handleCategory(categ.name)}
                <p className={selected === categ.name ? styles.selectedCategory : styles.otherCategories} onClick={() => handleCategory(categ.name, categ.id)} key={categ.id}>{categ.name.toUpperCase()}</p>
              ))}
          </div>
        </div>

        <div>
          <ProductList products={products} mycategory={mycategory} />

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
