import { Box } from '@chakra-ui/react';
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
	const {signIn} = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleLogin(event: FormEvent){
		event.preventDefault();

		if (!email) {
			toast.error('Informe seu e-mail');
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
		<Box></Box>
	)
}