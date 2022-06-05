
import {
    get,
    getDatabase,
    limitToFirst,
    orderByKey,
    query,
    ref,
    startAt
} from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useVideoList(page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([])
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        async function fetchVideos() {
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(8)
            );

            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(videoQuery);
                if (snapshot.exists) {
                    const videoList = Object.values(snapshot.val());
                    setVideos(prevVideos => {
                        return [...prevVideos, ...videoList]
                    })
                } else {
                    setHasMore(false)
                }

            } catch (error) {
                console.log('fetch videos error', error)
                setError(true);

            }
            finally {
                setLoading(false);
            }

        }
        fetchVideos();

    }, [page])

    return {
        loading,
        error,
        videos,
        hasMore
    }
}