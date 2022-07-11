import { useSession } from 'next-auth/react';
import styles from '../styles/index.module.scss';

function Index(): JSX.Element {
	const { data: session } = useSession();
	console.log(session);
	return (<>
		<div className={styles.container}>
			Hello
		</div>
	</>);
}

Index.authRequired = true;
export default Index;