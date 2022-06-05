
import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';
import { useAuth } from './../../contexts/AuthContext';
import useQuestions from './../../hooks/useQuestions';


const initialState = null;
const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach(question => {
                question.options.forEach(option => {
                    option.checked = false;
                })
            });
            return action.value;

        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked = action.value;
            return questions;


        default:
            return state

    }
}



export default function Quiz() {


    const { id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { loading, error, questions } = useQuestions(id);
    const [qna, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    //mini player video title
    const location = useLocation();
    const { state: { videoTitle } } = location;


    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions
        })
    }, [questions])

    const handleAnswerChange = (e, index) => {
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked
        })
    }

    //handle when user clicks the next button to go to next question
    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prevCurrent => prevCurrent + 1))
        }
    }
    //handle when user clicks the prev button to go to previous question
    const prevQuestion = () => {
        if (currentQuestion >= 1) {
            setCurrentQuestion((prevCurrent => prevCurrent - 1))
        }
    }

    // calculate percentage of progress
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    //submit quiz
    const submit = async () => {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna
        })
        navigate(`/result/${id}`, { state: { qna } });
    }


    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error...</div>}
            {!loading && !error && qna && qna.length > 0 &&
                (
                    <>
                        <h1>{qna[currentQuestion].title}</h1>
                        <h4>Question can have multiple answers</h4>

                        <Answers input={true} options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
                        <ProgressBar next={nextQuestion} prev={prevQuestion} submit={submit} progress={percentage} />
                        <MiniPlayer id={id} title={videoTitle} />
                    </>

                )}

        </>

    );

}