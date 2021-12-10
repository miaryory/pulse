import MenuBar from "../components/MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { logout } from "../redux/user";

export default function Profile(){
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login')
        }
    }, [])

    const handleLogout = () =>{
        dispatch(logout());
        //router.push('/login');
    }

    return(
        <>
            <MenuBar/>
            <p>hello</p>
            <button onClick={handleLogout}>Logout</button>
            
        </>
    );

}