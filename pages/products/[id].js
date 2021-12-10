import cocart from '../../lib/cocart';
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import Image from 'next/image';
import styles from '../../styles/ProductPage.module.css';
import { setCart } from "../../redux/cart";
import { useSelector, useDispatch } from 'react-redux';
import woocommerce from '../../lib/woocommerce';


export async function getStaticProps({ params }) {
    const { id } = params;
    const { data: product } = await woocommerce.get(`products/${id}`);

    return {
      props: {
        product,
      },
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
      fallback: false,
    };
  }

  export default function ProductPage({ product }) {
    const dispatch = useDispatch();
    const oldCart = useSelector(state => state.cart.cart_key);

    const addToCart = () =>{
      const prod ={
        "id": product.id.toString(),
        'quantity': "1"
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

            <div className={styles.productImage} >
                    <Image src={product.images[0].src} alt='Product' width={500} height={500} />
            </div>

            <div className={styles.productInfo}>
                <h1 className={styles.productName}>{product.name.toUpperCase()}</h1>
                <p dangerouslySetInnerHTML={{__html: product.price_html}}></p>
            </div>

            <div className={styles.productDescription} dangerouslySetInnerHTML={{__html: product.description}}></div>
            
            <div className={styles.productAttributes}>
              {product.attributes.map((attribute) => 
                attribute.name === 'Size'?
                  attribute.options.map((option)=> 
                  <div className={styles.sizeOption} key={attribute.options.indexOf(option)}>
                    <p>{option}</p>
                  </div>
                  )
                :
                null
              )}
            </div>

            <button className={styles.addToCartBtn} onClick={addToCart}>ADD TO CART</button>

        </div>

        <Footer/>

      </>
    );
  }