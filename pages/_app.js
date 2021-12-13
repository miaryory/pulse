import '../styles/globals.css';

import { store } from '../redux/store';
import { Provider } from 'react-redux';
import GetSessionInfo from '../components/GetSessionInfo';


export default function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
      <GetSessionInfo/>
      <Component {...pageProps} />
    </Provider>
  );
}
