import '../styles/globals.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import GetSessionInfo from '../components/GetSessionInfo';
import getStripe from '../lib/stripe';
import { Elements } from "@stripe/react-stripe-js";
import Head from 'next/head';
import dynamic from 'next/dynamic';
import "nprogress/nprogress.css";

const ProgressBar = dynamic(() => import('../components/ProgressBar'));

const stripe = getStripe();

export default function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
        <Head>
          <title>PULSE</title>
          <meta
          name="description"
          content="Final Project for Web Development. An e-commerce website. By Miary M. Ory.">
          </meta>
        </Head>
        <GetSessionInfo/>
      <Elements stripe={stripe}>
        <ProgressBar/>
        <Component {...pageProps} />
      </Elements>
    </Provider>
  );
}
