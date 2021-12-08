import commerce from "../../lib/commerce";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import Image from 'next/image';
import styles from '../../styles/ProductPage.module.css';
import { setCart } from "../../redux/cart";
import { useDispatch } from 'react-redux';


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
    const dispatch = useDispatch();

    const addToCart = () =>{
      commerce.cart.add(product.id).then(({cart}) => dispatch(setCart(cart)));
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

            <div className={styles.productDescription} dangerouslySetInnerHTML={{__html: product.description}}></div>
            
            <div>
            </div>

            <button className={styles.addToCartBtn} onClick={addToCart}>ADD TO CART</button>

        </div>

        <Footer/>

      </>
    );
  }