import '../styles/globals.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import GetSessionInfo from '../components/GetSessionInfo';
import getStripe from '../lib/stripe';
import { Elements } from "@stripe/react-stripe-js";

const stripe = getStripe();

export default function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
        <GetSessionInfo/>
      <Elements stripe={stripe}>
        <Component {...pageProps} />
      </Elements>
    </Provider>
  );
}
