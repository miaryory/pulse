import Link from "next/link";
import Image from 'next/image';
import styles from '../styles/SearchItem.module.css';

export default function SearchItem({id, featured_image, name}){

    return(
        <Link href={`/products/${id}`} passHref>
            <div className={styles.searchItem}>
                <Image src={featured_image ? featured_image : 'http://miaryory.com/pulse/wp-content/uploads/woocommerce-placeholder.png'} alt='Product' width={50} height={50} />
                <p>{name}</p>
            </div>
        </Link>
    );
}
