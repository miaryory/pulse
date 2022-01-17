import React, { useState } from 'react';
import styles from '../styles/MenuBar.module.css';
import { FaRegUserCircle, FaShoppingBasket } from "react-icons/fa";
import { useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import SearchItem from './SearchItem';

export default function MenuBar(){
    const item_count = useSelector((state) => state.cart.item_count);
    const userName = useSelector(state => state.user.userName);
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();

    const search = async (text) =>{
        const request = await fetch("/api/search", {
            method: "POST",
            body: text,
        });

        if(request.ok){
            const response = await request.json();
            if(response.length !== 0){
                setSearchResults(response);
                console.log(searchResults);
            }
        }
    }

    const handleSubmit = () => {
        event.preventDefault();
    }

    return(
        <div className={styles.menuBar}>
            <div className={styles.menuBarContainer}>
                <div className={styles.menuSection}>
                    <div>
                        <h1 onClick={() => router.push('/?page=1&category=', '/')} className={styles.menuBrand}>PULSE</h1>
                    </div>
                </div>

                <div className={styles.menuSection}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input className={styles.searchBar} type="search" placeholder="Search product" onChange={event => search(event.target.value)} onFocus={event => search(event.target.value)} onBlur={() => setSearchResults([])}/>
                        </form>
                        <div className={styles.searchResults}>
                            {searchResults.length > 0 ?
                            searchResults.map((result) =>
                                <SearchItem key={result.id} id={result.id} featured_image={result.images[0].src} name={result.name} />
                            )
                            :
                            null}
                        </div>
                    </div>
                    <div onClick={() => router.push('/profile')}>
                        <FaRegUserCircle className={styles.menuIcon}  size={30} color={"black"}/>
                    </div>
                    <p>{userName}</p>
                    <div className={styles.cartIcon} onClick={() => router.push('/cart')}>
                        <FaShoppingBasket className={styles.menuIcon}  size={30} color={"black"}/>
                        {item_count > 0 ?
                            <div className={styles.itemNumber}>
                            <p>{item_count}</p>
                            </div> 
                        :
                            null
                        }
                    </div>
                </div>
            </div>

        </div>
    );

}