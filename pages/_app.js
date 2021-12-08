import '../styles/globals.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import GetCart from '../components/GetCart';


export default function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
      <GetCart/>
      <Component {...pageProps} />
    </Provider>
  );
}
