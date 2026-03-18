import React, { useEffect, useState } from 'react';
import apiAdmin from '../pages/adminapi';
import Loading from '../loading';
import Naviba from './naviba';
import Popup from '../pages/popup';

// Utility function to generate random colors
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Sel_question = () => {
    const [questions, setQuestions] = useState([]);
    const [showDetails, setShowDetails] = useState(null);
    const [userColors, setUserColors] = useState({});
    const [loading, setLoading] = useState(true);

    const [languages, setLanguages] = useState([]); // List of languages
    const [selectedLang, setSelectedLang] = useState(''); // Currently selected language

    const [data, setData] = useState([]); // Message to show in popup
    const [alert, setAlert] = useState(false); // Popup visibility state

    useEffect(() => {
        fetchLanguages();
        fetchAllQuestions();
    }, []);

    const fetchLanguages = () => {
        apiAdmin.get('http://localhost/get/all/admin/new/languages/data')
            .then(res => {
                if (res.data.Data) {
                    setLanguages(res.data.Data);
                } else {
                    console.warn('Unexpected response structure:', res.data);
                }
            })
            .catch(handleApiError);
    };

    const fetchAllQuestions = () => {
        apiAdmin.get('http://localhost/admin/get/tottal/users/created/questions')
            .then(res => {
                if (res.data.data) {
                    setQuestions(res.data.data);

                    // Assign random colors to unique users
                    const uniqueUsers = [...new Set(res.data.data.map(q => q.user))];
                    const colorMapping = {};
                    uniqueUsers.forEach(user => {
                        colorMapping[user] = getRandomColor();
                    });
                    setUserColors(colorMapping);
                } else if (res.data.Logout === 'OUT') {
                    localStorage.removeItem('token');
                    window.location.reload();
                } else {
                    console.warn('Unexpected response structure:', res.data);
                }
            })
            .catch(handleApiError)
            .finally(() => setLoading(false));
    };

    const handleApiError = (error) => {
        setLoading(false);
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response from server. Please check your connection.');
        } else {
            console.error('Error occurred:', error.message);
        }
    };

    const handleSelectData = (question) => {
        setAlert(false)
        if (!selectedLang) {
            setData('Please select a language!');
            setAlert(true);
            return;
        }

        apiAdmin.post("http://localhost/get/data/and/post/users/selected/data/to/db", {
            user: question.user,
            img: question.img,
            Questio: question.Questio,
            a: question.a,
            b: question.b,
            c: question.c,
            d: question.d,
            Ans: question.Ans,
            lang: question.lang,
            sel_lang: selectedLang,
            tough: question.tough,
            seconds: question.seconds
        })
            .then(res => {
                if (res.data.Status === "OK") {
                    setData('Posted successfully!');
                    setAlert(true);
                }
                else if(res.data.Status === "IN"){
                    setData('This Question Exist');
                    setAlert(true);
                }
                else {
                    setData('Something went wrong!');
                    setAlert(true);
                }
                
            })
            .catch(error => {
                console.error('Error:', error);
                setData('Error occurred while posting!');
                setAlert(true);
            });
    };

    const hideDetails = () => setShowDetails(null);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <center>
                    <div className="Home-cnt-01-sub-01">
                        <strong>
                            sta<span>W</span>ro
                        </strong>
                        <hr />
                    </div>

                    <h1 className="main-h1-01">Select Any Question</h1>
                    <br />
                    <span className="sel_question-span-01">
                        Total Questions: {questions.length}
                    </span>
                    <br />

                    <div style={{height: "30px"}}></div>

                    {/* Language Selector */}
                    <select onChange={e => setSelectedLang(e.target.value)} value={selectedLang}>
                        <option value="">Select Language</option>
                        {languages.map((lang, i) => (
                            <option key={i} value={lang}>{lang}</option>
                        ))}
                    </select>
                

                    <div style={{ height: '30px' }}></div>

                    <div className="sel_question-main-cnt-01">
                        {questions.map((question, i) => {
                            const isExpanded = showDetails === question._id;

                            return (
                                <div
                                    key={i}
                                    className={
                                        isExpanded
                                            ? 'sel_question-main-cnt-01-sub-01-show-more'
                                            : 'sel_question-main-cnt-01-sub-01'
                                    }
                                    style={{ backgroundColor: userColors[question.user] }}
                                    onClick={() => setShowDetails(question._id)}
                                >
                                    <h2 className="sel_question-main-cnt-01-sub-01-h2-01">
                                        {question.Questio}
                                    </h2>
                                    <span>{question.user}</span><br/>
                                    <span>{question.tough}</span><br/>
                                    <span>{question.lang}</span><br/>

                                    {isExpanded && (
                                        <div>
                                            <h2>
                                                Seconds: <strong>{question.seconds}</strong>
                                            </h2>
                                            <div>
                                                <img src={question.img} alt="question" />
                                            </div>
                                            <div>
                                                {['a', 'b', 'c', 'd'].map(option => (
                                                    <button
                                                        key={option}
                                                        className={
                                                            question.Ans === option
                                                                ? 'Admin_QuestionView-Answer'
                                                                : 'admin_questions-view-sub-cnt-01-btn-01-01'
                                                        }
                                                    >
                                                        {question[option]}
                                                    </button>
                                                ))}
                                            </div>
                                            <span>Language: <strong>{question.lang}</strong></span>
                                            <br />
                                            <span>Type: <strong>{question.tough}</strong></span>
                                            <br />
                                            <button className='btn-01' onClick={() => handleSelectData(question)}>
                                                Select
                                            </button>
                                            
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ height: '100px' }}></div>
                </center>
            )}
            <Naviba />

            {/* Popup */}
            {alert && <Popup data={data} val={alert} />}
        </div>
    );
};

export default Sel_question;
