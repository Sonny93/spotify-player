import { getSession, signOut, useSession } from 'next-auth/react';
import styles from '../styles/index.module.scss';

import SpotifyWebApi from 'spotify-web-api-node';
import { useEffect, useState } from 'react';


function Index(): JSX.Element {
	const [spotifyInstance, setSpotifyInstance] = useState<SpotifyWebApi>();
	const [data, setData] = useState<SpotifyApi.CurrentlyPlayingResponse>();
	const { data: session } = useSession();

	useEffect(() => {
		const token = session?.['accessToken'] as string;
		const spotify = createSpotifyInstance(token);
		setSpotifyInstance(spotify);
	}, [session]);

	useEffect(() => {
		if (!spotifyInstance) return;

		const interval = setInterval(async () => {
			const { body } = await spotifyInstance.getMyCurrentPlayingTrack();
			setData(body);
		}, 1000);

		return () => clearInterval(interval);
	}, [spotifyInstance]);

	const progress = millisToMinutesAndSeconds(data?.progress_ms || 0);
	const duration = millisToMinutesAndSeconds(data?.item?.duration_ms || 0);
	return (<>
		<div className={styles.container}>
			Hello
			<button onClick={() => signOut()}>signout</button>
			<div>
				<p>{data?.item?.name} - {data?.item.album.artists[0].name}</p>
				<p>{progress} - {duration}</p>
			</div>
			<code style={{ height: '200px', display: 'block', overflow: 'scroll' }}>
				<pre>
					{JSON.stringify(data?.item, null, 2)}
				</pre>
			</code>
		</div>
	</>);
}

function createSpotifyInstance(token: string) {
	const spotify = new SpotifyWebApi();
	spotify.setAccessToken(token);
	return spotify;
}

function millisToMinutesAndSeconds(millis: number = 0): string {
	const minutes = Math.floor(millis / 60000);
	const seconds = Math.floor(((millis % 60000) / 1000));
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export async function getServerSideProps({ context }: any) {
	const session = await getSession(context);
	console.log('là', session)
	return {
		props: {}
	}
}

Index.authRequired = true;
export default Index;