import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

// Função para páginas que só podem ser acessadas por usuários não autenticados

export function canSSRGuest<P extends {[key: string]: any}>(fn: GetServerSideProps<P>){
	return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(ctx);

		if (cookies['@nextauth.token']) {
			return {
				redirect: {
					destination: '/dashboard',
					permanent: false
				}
			}
		}
		return await fn(ctx)
	}
}