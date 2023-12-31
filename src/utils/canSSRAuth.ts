import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

// Função para páginas que só podem ser acessadas por usuários autenticados

export function canSSRAuth<P extends {[key: string]: any}>(fn: GetServerSideProps<P>){
	return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(ctx);
		const token = cookies['@nextauth.token']

		if(!token){
			return {
				redirect: {
					destination: '/home',
					permanent: false
				}
			}
		}
		try {
			return await fn(ctx)
		} catch (error) {
			if(error instanceof AuthTokenError){
				destroyCookie(ctx, '@nextauth.token')
			}
				//destroyCookie(ctx, 'nextauth.refreshToken')
				return {
					redirect: {
						destination: '/',
						permanent: false
					}
				}
		}
	}
}
