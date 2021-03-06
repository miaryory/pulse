import cocart from '../../lib/cocart';
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import Image from 'next/image';
import styles from '../../styles/ProductPage.module.css';
import { setCart } from "../../redux/cart";
import { useSelector, useDispatch } from 'react-redux';
import woocommerce from '../../lib/woocommerce';
import { useState } from 'react';
import Product from '../../components/Product';
import Link from 'next/link';


export async function getStaticProps({ params }) {
    const { id } = params;
    const { data: product } = await woocommerce.get('products/'+id);

    if (!product) {
      return {
        notFound: true,
      }
    }

    const relatedIds = product.related_ids;
    let idQuery = '';
    relatedIds.map((id)=>
      idQuery += id+','
    );

    const { data: relatedProducts } = await woocommerce.get('products?include='+idQuery);

    return {
      props: {
        product,
        relatedProducts,
      },
      revalidate: 10,
    };
  }

  export async function getStaticPaths() {
    const { data: products } = await woocommerce.get('products');
  
    return {
      paths: products.map((product) => ({
        params: {
          id: product.id.toString(),
        },
      })),
      fallback: true,
    };
  }

  export default function ProductPage({ product, relatedProducts }) {
    const [size, setSize] = useState('');
    const [selected, setSelected] = useState('');
    const dispatch = useDispatch();
    const oldCart = useSelector(state => state.cart.cart_key);

    const selectSize = (sizeId, size) =>{
      setSelected(sizeId);
      setSize(size);
    }

    const addToCart = () =>{
      const prod ={
        'id': product.id.toString(),
        'quantity': "1",
        'item_data':{
          'size': size.toString(),
        }
      }

      if(oldCart !== ''){
        cocart.post("cart/add-item?cart_key="+oldCart, prod).then((response) => {
          dispatch(setCart(response.data));
        })
        .catch((error) => {
          console.log("Response Data:", error.response.data);
        });
      }
      
      if(oldCart === ''){
        cocart.post("cart/add-item", prod).then((response) => {
          if (typeof window !== "undefined") {
              window.localStorage.setItem('cart_key', response.data.cart_key);
              dispatch(setCart(response.data));
          }
        })
        .catch((error) => {
          console.log("Response Data:", error.response.data);
        });
      }
    }

    return (
      <>
        <MenuBar/>

        <div className={styles.productPage}>

          {product ? 
          <>
          <div className={styles.productPageContainer}>
            <div className={styles.productImage} >
                    <Image src={product.images[0] ? product.images[0].src : 'http://miaryory.com/pulse/wp-content/uploads/woocommerce-placeholder.png'} alt='Product' width={500} height={500}/>
            </div>

            <div className={styles.productInfoContainer}>
              <div className={styles.productInfo}>
                  <h1 className={styles.productName}>{product.name.toUpperCase()}</h1>
                  <p dangerouslySetInnerHTML={{__html: product.price_html}}></p>
              </div>

              <div className={styles.productDescription} dangerouslySetInnerHTML={{__html: product.description}}></div>
              
              <div>
              {product.attributes.length === 0 ? 
                  <button className="primaryBtn" onClick={addToCart} >ADD TO CART</button> 
                  : 
                  product.attributes.map((attribute)=>
                    attribute.name === 'Size' ?
                    <div key={attribute.id}>
                      <div className={styles.productAttributes}>
                      {attribute.options.map((option)=> 
                        <button className={ selected === attribute.options.indexOf(option) ? styles.selectedSize : styles.sizeOption} key={attribute.options.indexOf(option)} onClick={() => selectSize(attribute.options.indexOf(option), option)}>
                          <p>{option}</p>
                        </button>
                      )}
                      </div>
                      <button className="primaryBtn" onClick={addToCart} disabled={size === '' ? true : false}>ADD TO CART</button>
                    </div>
                    :
                    <button className="primaryBtn" onClick={addToCart}>ADD TO CART</button>
                  )
              }
              </div>

            </div>


          </div>
          <div className={styles.relatedProductsContainer}>
            <h1 style={{fontSize: '14px'}}>RELATED PRODUCTS</h1>

            <div className={styles.relatedProducts} >
              {relatedProducts.length > 0 ? 
                relatedProducts.map((product)=>
                  <div key={product.id}>
                    <Link href={`/products/${product.id}`}>
                      <a>
                        <Product image={product.images[0] ? product.images[0].src : 'http://miaryory.com/pulse/wp-content/uploads/woocommerce-placeholder.png'} name={product.name} price={product.price_html} />
                      </a>
                    </Link>
                  </div>
                )
              : 
              null}
            </div>

          </div>
          </>
          : 
            null}

        </div>

        <Footer/>

      </>
    );
  }