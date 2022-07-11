import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function Auth({ children }: { children: JSX.Element; }): JSX.Element {
	const router = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated: () => router.push('/signin')
	});

	if (status === 'loading') {
		return (
			<div className='App' style={{ alignItems: 'center' }}>
				<p style={{ height: 'fit-content' }}>Chargement de la session en cours</p>
			</div>
		);
	}

	return children;
}