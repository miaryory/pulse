import commerce from "../../lib/commerce";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import Image from 'next/image';

import styles from '../../styles/ProductPage.module.css';
import { useCartDispatch } from "../../context/cart";

export async function getStaticProps({ params }) {
    const { permalink } = params;
  
    const product = await commerce.products.retrieve(permalink, {
      type: 'permalink',
    });
  
    return {
      props: {
        product,
      },
    };
  }

  export async function getStaticPaths() {
    const { data: products } = await commerce.products.list();
  
    return {
      paths: products.map((product) => ({
        params: {
          permalink: product.permalink,
        },
      })),
      fallback: false,
    };
  }

  export default function ProductPage({ product }) {
    const { setCart } = useCartDispatch();

    const addToCart = () =>{
      commerce.cart.add(product.id).then(({cart}) => setCart(cart));
    }

    return (
      <>
        <MenuBar/>

        <div className={styles.productPage}>

            <div className={styles.productImage} >
                    <Image src={product.image.url} alt='Product' width={500} height={500} />
            </div>

            <div className={styles.productInfo}>
                <h1 className={styles.productName}>{product.name.toUpperCase()}</h1>
                <p>{product.price.formatted_with_code}</p>
            </div>

            {product.description}

            <button onClick={addToCart}>Add to cart</button>

        </div>

        <Footer/>

      </>
    );
  }