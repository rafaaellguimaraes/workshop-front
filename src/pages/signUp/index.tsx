import Head from "next/head";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import styles from '../../../styles/Home.module.scss';
import { Button } from '../../components/Button';
import { Input } from "../../components/Input";
import { AuthContext } from "../../context/AuthContext";
import { canSSRGuest } from '../../utils/canSSRGuest';

export default function Home() {
	const {signUp} = useContext(AuthContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleLogin(event: FormEvent) {
		event.preventDefault();

		if (!email || !name) {
			toast.error('Email e Nome é obrigatório');
			return;
		}

		setLoading(true);

		let data = {
			email,
			name
		}

		await signUp(data);
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
							<h2>Cadastre-se:</h2>
							<Input 
								type="text"
								placeholder="Digite seu email"
								value={email}
								onChange={event => setEmail(event.target.value)}
							/>
							<Input 
								type="text"
								placeholder="Digite seu nome"
								value={name}
								onChange={event => setName(event.target.value)}
							/>
							<Button type="submit" loading={loading}>Cadastrar</Button>
						</form>

						<Link href='/' legacyBehavior>
							<a className={styles.text}>Já tem uma conta? Faça o login!</a>
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