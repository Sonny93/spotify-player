import { SessionProvider } from 'next-auth/react';
import AuthRequired from '../components/AuthRequired';
import '../styles/globals.css';

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps }
}: any): JSX.Element {
	return (<>
		<SessionProvider session={session}>
			{Component.authRequired ? (
				<AuthRequired>
					<Component {...pageProps} />
				</AuthRequired>
			) : (
				<Component {...pageProps} />
			)}
		</SessionProvider>
	</>);
}
