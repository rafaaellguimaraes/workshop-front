import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { api } from "../services/apiClient";


type AuthContextData = {
	user: UserProps;
	isAutenticated: boolean;
	signIn: (data: SignInData) => Promise<void>;
	signOut: () => void;
	signUp: (data: SignUpData) => Promise<void>;
}

type UserProps = {
	id: string;
	email: string;
	name: string;
}

type SignInData = {
	email: string;
}

type SignUpData = {
	email: string;
	name: string;
}

type AuthProviderProps = {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
	try {
		destroyCookie(undefined, '@nextauth.token')
		Router.push('/');
	} catch (error) {
		console.log(error);
	}
}

export function AuthProvider({children}: AuthProviderProps) {
	const [user, setUser] = useState<UserProps>({} as UserProps);
	const isAutenticated = !!user; //Converto o user para booleano

	useEffect(() => {
		const { '@nextauth.token': token } = parseCookies();

		if (token) {
			api.get('/userinfo').then(response => {
				const {id, name, email} = response.data;

				setUser({id, name, email});
			}).catch(() => {
				signOut();
			});
		}
	});

	async function signIn({email}: SignInData) {
		try {
			const response = await api.post('/login', {email})

			const {token, id, name} = response.data;

			setCookie(undefined, '@nextauth.token', token, {
				maxAge: 60 * 60 * 24 * 10, // 10 days
				path: '/'
			});

			setUser({id, name, email});

			api.defaults.headers['Authorization'] = `Bearer ${token}`;

			toast.success('Login realizado com sucesso!');
			Router.push('/home');
		} catch (error) {
			toast.error('Erro ao realizar login! usuário ou senha inválidos');
		}
	}

	async function signUp({email, name}: SignUpData) {
		try {
			const response = await api.post('/users', {email, name});

			const {token, id} = response.data;

			setUser({id, name, email});

			toast.success('Cadastro realizado com sucesso!');
			Router.push('/');
		} catch (error) {
			toast.error('Erro ao realizar cadastro!');
		}
	}

	return (
		<AuthContext.Provider value={{user, isAutenticated, signIn, signOut, signUp}}>
			{children}
		</AuthContext.Provider>
	)
}