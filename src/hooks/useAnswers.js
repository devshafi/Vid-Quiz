
import {
    get,
    getDatabase, orderByKey,
    query,
    ref
} from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useAnswers(videoID) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([])
    useEffect(() => {
        async function fetchAnswers() {
            const db = getDatabase();
            const answerRef = ref(db, "answers/" + videoID + "/questions");
            const answerQuery = query(
                answerRef,
                orderByKey());

            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(answerQuery);
                if (snapshot.exists) {
                    const answers = Object.values(snapshot.val());
                    setAnswers(prevAnswers => {
                        return [...prevAnswers, ...answers]
                    })
                }

            } catch (error) {
                console.log('fetch videos error', error)
                setError(true);

            }
            finally {
                setLoading(false);
            }

        }
        fetchAnswers();

    }, [videoID])

    return {
        loading,
        error,
        answers
    }
}