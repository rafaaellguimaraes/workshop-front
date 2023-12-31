import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/globals.scss';
import { AuthProvider } from '../context/AuthContext';


export default function App({ Component, pageProps }: AppProps) {
  return (
		<AuthProvider>
			<Head>
				<meta 
					name="viewport" 
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
			</Head>
			<Component {...pageProps} />
			<ToastContainer autoClose={3000} />
		</AuthProvider>
	) 
}
