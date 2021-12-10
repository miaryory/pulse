import MenuBar from "../components/MenuBar";
import { useState } from 'react';

export default function Shipping(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postCode, setPostCode] = useState('');

    const handleSubmit = () => {
        event.preventDefault();
        console.log('checkout');
    }

    return(
        <>
            <MenuBar/>
            <div>
                <h1>SHIPPING ADDRESS</h1>

                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input type="text" value={firstName} onChange={event => setFirstName(event.target.value)} />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" value={lastName} onChange={event => setLastName(event.target.value)} />
                    </label>
                    <label>
                        Address:
                        <input type="text" value={address} onChange={event => setAddress(event.target.value)} />
                    </label>
                    <label>
                        City:
                        <input type="text" value={city} onChange={event => setCity(event.target.value)} />
                    </label>
                    <label>
                        Country:
                        <input type="text" value={country} onChange={event => setCountry(event.target.value)} />
                    </label>
                    <label>
                        Postal Code:
                        <input type="text" value={postCode} onChange={event => setPostCode(event.target.value)} />
                    </label>
                    
                    <input type="submit" value="CONTINUE" />
                </form>

            </div>
        </>
    );
}