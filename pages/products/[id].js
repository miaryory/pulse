import commerce from "../../lib/commerce";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import Image from 'next/image';
import styles from '../../styles/ProductPage.module.css';
import { setCart } from "../../redux/cart";
import { useDispatch } from 'react-redux';
import woocommerce from '../../lib/woocommerce';


export async function getStaticProps({ params }) {
    const { id } = params;

  const { data: product } = await woocommerce.get(`products/${id}`);
  
    /*const product = await commerce.products.retrieve(id, {
      type: 'permalink',
    });*/

    return {
      props: {
        product,
      },
    };
  }

  export async function getStaticPaths() {
    //const { data: products } = await commerce.products.list();
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

    const addToCart = () =>{
      //commerce.cart.add(product.id).then(({cart}) => dispatch(setCart(cart)));
      console.log('added to cart - [id].js');
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
            
            <div>
            </div>

            <button className={styles.addToCartBtn} onClick={addToCart}>ADD TO CART</button>

        </div>

        <Footer/>

      </>
    );
  }