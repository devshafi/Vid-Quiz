
import {
    get,
    getDatabase, orderByKey,
    query,
    ref
} from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useQuestions(videoID) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        async function fetchQuestions() {
            const db = getDatabase();
            const quizRef = ref(db, "quiz/" + videoID + "/questions");
            const quizQuery = query(
                quizRef,
                orderByKey());

            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(quizQuery);
                if (snapshot.exists) {
                    const questions = Object.values(snapshot.val());
                    setQuestions(prevQuestions => {
                        return [...prevQuestions, ...questions]
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
        fetchQuestions();

    }, [videoID])

    return {
        loading,
        error,
        questions
    }
}