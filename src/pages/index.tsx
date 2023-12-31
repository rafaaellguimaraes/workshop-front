import Head from "next/head";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import styles from '../../styles/Home.module.scss';
import { Button } from '../components/Button';
import { Input } from "../components/Input";
import { AuthContext } from "../context/AuthContext";
import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
	const {signIn} = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleLogin(event: FormEvent) {
		event.preventDefault();

		if (!email) {
			toast.error('Email é obrigatório');
			return;
		}

		setLoading(true);

		let data = {
			email
		}

		await signIn(data);
		setLoading(false);
	}

	return (
		<>
			<div className={styles.containerWrapper}>
			<Head>
				<title>
					Login
				</title>
			</Head>
				<div className={styles.containerleft}>
					<div className={styles.container}>
						<div className={styles.title}>
							<h2>21</h2>
						</div>
						<div className={styles.description}>
							<h3>dias para<br/>transformar<br/>a SUA VIDA</h3>
						</div>
					</div>
					<div className={styles.subtitle}>
						<h3>WHORKSHOP GRATUITO</h3>
						<h3>DESCUBRA O CAMINHO PARA A MUDANÇA!</h3>
					</div>
				</div>
				<div className={styles.containerCenter}>
					<div className={styles.containerIpunt}>
					<div className={styles.login}>
						<form onSubmit={handleLogin}>
							<h2>Login:</h2>
							<Input 
								type="text"
								placeholder="Digite seu email"
								value={email}
								onChange={event => setEmail(event.target.value)}
							/>
							<Button type="submit" loading={loading}>Acessar</Button>
						</form>

						<Link href='/signUp' legacyBehavior>
							<a className={styles.text}>Ainda não se inscreveu? se inscreva!</a>
						</Link>
					</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
	return {
		props: {}
	}
});