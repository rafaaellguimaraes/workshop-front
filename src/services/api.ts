import axios, { AxiosError } from "axios";
import { parseCookies } from 'nookies';
import { signOut } from "../context/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

export function getAPIClient(ctx = undefined) {
	let cookies = parseCookies(ctx);

	const api = axios.create({
		baseURL: 'http://localhost:3334',
		headers: {
			Authorization: `Bearer ${cookies['@nextauth.token']}`
		}
	});

	api.interceptors.request.use(config => {
		return config;
	}, (error: AxiosError) => {
		if (error.response?.status === 401) {
			if(typeof window === 'undefined') {
				signOut();
			} else {
				return Promise.reject(new AuthTokenError());
			}
		}

		return Promise.reject(error);
	});

	return api;
}