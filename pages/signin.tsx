import { getProviders, signIn, useSession } from 'next-auth/react';
import { Provider } from 'next-auth/providers';

import Link from 'next/link';
import Head from 'next/head';

import styles from '../styles/login.module.scss';

export default function SignIn({ providers }: { providers: Provider[]; }) {
    const { data: session } = useSession();

    return (<>
        <Head>
            <title>Superpipo — Authentification</title>
        </Head>
        <div className='App'>
            <div className={styles['wrapper']}>
                <h2>Se connecter</h2>
                <div className={styles['providers']}>
                    {Object.values(providers).map(({ name, id }) => (
                        <button key={id} onClick={() => signIn(id, { callbackUrl: '/' })} disabled={session !== null}>
                            Continuer avec {name}
                        </button>
                    ))}
                </div>
                <Link href='/'>
                    <a>← Revenir à l'accueil</a>
                </Link>
            </div>
        </div>
    </>);
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: { providers }
    }
}