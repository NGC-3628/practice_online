<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz de Gramática - Inglés</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- React & ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <!-- Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body class="bg-slate-100 min-h-screen text-slate-800 font-sans p-4 md:p-8">
    <div id="root" class="max-w-3xl mx-auto"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;

        const quizData = {
            reflexive: {
                title: "Reflexive Pronouns",
                questions: [
                    { q: "I cut ___ while chopping onions.", options: ["me", "myself", "himself", "mine"], a: "myself", exp: "La acción recae sobre el mismo sujeto (I)." },
                    { q: "She looked at ___ in the mirror.", options: ["her", "hers", "herself", "she"], a: "herself", exp: "El sujeto es 'She', por lo tanto usamos 'herself'." },
                    { q: "We built this treehouse by ___.", options: ["ourselves", "us", "our", "themselves"], a: "ourselves", exp: "'We' requiere el reflexivo plural 'ourselves'." },
                    { q: "The cat is washing ___.", options: ["it", "itself", "himself", "its"], a: "itself", exp: "Para animales de género desconocido o cosas, usamos 'itself'." },
                    { q: "Did you guys make dinner all by ___?", options: ["yourself", "yourselves", "you", "yours"], a: "yourselves", exp: "Como es plural ('you guys'), se usa 'yourselves'." },
                    { q: "He taught ___ to play the guitar.", options: ["him", "his", "himself", "he"], a: "himself", exp: "El sujeto 'He' requiere el reflexivo 'himself'." },
                    { q: "They paid for ___ at the restaurant.", options: ["them", "themselves", "their", "theirs"], a: "themselves", exp: "'They' requiere 'themselves'." },
                    { q: "Please, help ___ to some cake, John.", options: ["yourself", "yourselves", "you", "yours"], a: "yourself", exp: "Es singular, dirigiéndose a una sola persona (John)." },
                    { q: "The machine turns ___ off automatically.", options: ["it", "its", "itself", "himself"], a: "itself", exp: "'The machine' es un objeto, por lo que usamos 'itself'." },
                    { q: "I don't need help, I can do it ___.", options: ["me", "mine", "myself", "my"], a: "myself", exp: "Indica que el sujeto (I) hace la acción sin ayuda." }
                ]
            },
            future: {
                title: "Will vs Going to",
                questions: [
                    { q: "Look at those dark clouds! It ___ rain.", options: ["will", "is going to", "going to", "wills"], a: "is going to", exp: "Usamos 'going to' para predicciones basadas en evidencia visual presente (las nubes)." },
                    { q: "I think humanity ___ live on Mars in 2050.", options: ["is going to", "will", "are going to", "would"], a: "will", exp: "Para predicciones futuras basadas en opiniones o creencias, usamos 'will'." },
                    { q: "I don't have my wallet! - Don't worry, I ___ pay.", options: ["am going to", "will", "pay", "am to"], a: "will", exp: "Usamos 'will' para decisiones espontáneas tomadas en el momento de hablar." },
                    { q: "We ___ visit our grandparents this weekend. We bought the tickets.", options: ["will", "are going to", "is going to", "shall"], a: "are going to", exp: "Se usa 'going to' porque ya hay un plan o arreglo previo (compraron boletos)." },
                    { q: "Watch out! You ___ drop those plates!", options: ["will", "are going to", "going", "would"], a: "are going to", exp: "Es una situación inminente con evidencia clara; usamos 'are going to'." },
                    { q: "I promise I ___ tell anyone your secret.", options: ["am not going to", "won't", "don't will", "willn't"], a: "won't", exp: "Para promesas se usa 'will' (o 'won't' en negativo)." },
                    { q: "What ___ do after you graduate?", options: ["will you", "are you going to", "do you", "you will"], a: "are you going to", exp: "Pregunta sobre planes a futuro o intenciones." },
                    { q: "The phone is ringing. I ___ get it.", options: ["will", "am going to", "getting", "get"], a: "will", exp: "Decisión rápida o reacción en el momento de hablar." },
                    { q: "She ___ have a baby in December.", options: ["will", "is going to", "going to", "shall"], a: "is going to", exp: "Es un hecho a futuro basado en evidencia actual (el embarazo)." },
                    { q: "Maybe I ___ study French next year.", options: ["am going to", "will", "gonna", "am will"], a: "will", exp: "Expresa una posibilidad futura sin un plan firme ('maybe')." }
                ]
            },
            modals: {
                title: "Should & Shouldn't",
                questions: [
                    { q: "You have a headache. You ___ rest.", options: ["should", "shouldn't", "would", "mustn't"], a: "should", exp: "Se usa 'should' para dar un buen consejo." },
                    { q: "It's raining. She ___ forget her umbrella.", options: ["should", "shouldn't", "can't", "might"], a: "shouldn't", exp: "Es una mala idea olvidar el paraguas, por lo que usamos 'shouldn't'." },
                    { q: "They ___ eat so much junk food if they want to be fit.", options: ["should", "shouldn't", "could", "would"], a: "shouldn't", exp: "Recomendación negativa para evitar malos hábitos." },
                    { q: "You ___ brush your teeth twice a day.", options: ["shouldn't", "should", "couldn't", "will"], a: "should", exp: "Es un consejo general de salud." },
                    { q: "He looks tired. He ___ go to bed late.", options: ["should", "shouldn't", "can", "has"], a: "shouldn't", exp: "Consejo negativo; no es recomendable que duerma tarde." },
                    { q: "If you want to learn English, you ___ practice daily.", options: ["should", "shouldn't", "don't", "didn't"], a: "should", exp: "Es la mejor sugerencia para lograr un objetivo." },
                    { q: "We ___ talk loudly in the library.", options: ["should", "shouldn't", "shoulds", "must"], a: "shouldn't", exp: "Da un consejo sobre el comportamiento adecuado en un lugar." },
                    { q: "___ I buy the red shirt or the blue one?", options: ["Shouldn't", "Could", "Should", "Would"], a: "Should", exp: "Para pedir un consejo o sugerencia se inicia la pregunta con 'Should'." },
                    { q: "It's freezing outside. You ___ wear a jacket.", options: ["should", "shouldn't", "shoulds", "can't"], a: "should", exp: "Consejo positivo para protegerse del clima." },
                    { q: "People ___ throw trash in the ocean.", options: ["should", "shouldn't", "can", "might"], a: "shouldn't", exp: "Es una recomendación ética/moral fuerte." }
                ]
            },
            tags: {
                title: "Question Tags",
                questions: [
                    { q: "You are a student, ___?", options: ["are you", "aren't you", "do you", "don't you"], a: "aren't you", exp: "Oración positiva usa tag negativo. Verbo 'are' -> 'aren't you'." },
                    { q: "She isn't coming to the party, ___?", options: ["isn't she", "does she", "is she", "has she"], a: "is she", exp: "Oración negativa usa tag positivo. 'isn't' -> 'is she'." },
                    { q: "He plays tennis very well, ___?", options: ["doesn't he", "does he", "isn't he", "plays he"], a: "doesn't he", exp: "Presente simple positivo requiere auxiliar negativo 'doesn't he'." },
                    { q: "They didn't go to school, ___?", options: ["did they", "didn't they", "do they", "were they"], a: "did they", exp: "Pasado simple negativo requiere auxiliar positivo 'did they'." },
                    { q: "We have finished the project, ___?", options: ["don't we", "have we", "haven't we", "didn't we"], a: "haven't we", exp: "Presente perfecto (have finished) usa el mismo auxiliar en negativo: 'haven't we'." },
                    { q: "You will call me, ___?", options: ["will you", "won't you", "don't you", "aren't you"], a: "won't you", exp: "El tag negativo de 'will' es 'won't'." },
                    { q: "I am late, ___?", options: ["am not I", "aren't I", "don't I", "isn't I"], a: "aren't I", exp: "Excepción gramatical: El tag de 'I am' siempre es 'aren't I'." },
                    { q: "Let's go to the beach, ___?", options: ["don't we", "will we", "shall we", "are we"], a: "shall we", exp: "Excepción: Para sugerencias con 'Let's', el tag correcto es 'shall we'." },
                    { q: "It was a great movie, ___?", options: ["wasn't it", "was it", "didn't it", "isn't it"], a: "wasn't it", exp: "Pasado del verbo to be 'was' -> 'wasn't it'." },
                    { q: "Nobody called, ___?", options: ["did they", "didn't they", "did nobody", "didn't nobody"], a: "did they", exp: "Excepción: 'Nobody' es negativo, así que el tag es positivo, y se usa el pronombre 'they'." }
                ]
            }
        };

        function App() {
            const [view, setView] = useState('menu'); 
            const [topic, setTopic] = useState(null);
            const [currentQ, setCurrentQ] = useState(0);
            const [correct, setCorrect] = useState(0);
            const [wrong, setWrong] = useState(0);
            const [selected, setSelected] = useState(null);
            const [isAnswered, setIsAnswered] = useState(false);
            const [session, setSession] = useState(null);

            const startQuiz = (key) => {
                if (session && session.topic === key && (Date.now() - session.time < 10000)) {
                    setTopic(session.topic);
                    setCurrentQ(session.currentQ);
                    setCorrect(session.correct);
                    setWrong(session.wrong);
                } else {
                    setTopic(key);
                    setCurrentQ(0);
                    setCorrect(0);
                    setWrong(0);
                }
                setSession(null);
                setSelected(null);
                setIsAnswered(false);
                setView('quiz');
            };

            const backToMenu = () => {
                setSession({
                    topic, currentQ, correct, wrong, time: Date.now()
                });
                setView('menu');
            };

            const handleAnswer = (option) => {
                if (isAnswered) return;
                setSelected(option);
                setIsAnswered(true);
                const actualAnswer = quizData[topic].questions[currentQ].a;
                if (option === actualAnswer) {
                    setCorrect(prev => prev + 1);
                } else {
                    setWrong(prev => prev + 1);
                }
            };

            const nextQuestion = () => {
                if (currentQ < 9) {
                    setCurrentQ(prev => prev + 1);
                    setSelected(null);
                    setIsAnswered(false);
                } else {
                    setView('results');
                }
            };

            if (view === 'menu') {
                return (
                    <div className="bg-white p-8 rounded-xl shadow-lg mt-10">
                        <h1 className="text-3xl font-bold text-center mb-2">Quiz de Gramática</h1>
                        <p className="text-center text-gray-500 mb-8">Selecciona un tema para comenzar (10 preguntas por tema)</p>
                        
                        {session && (Date.now() - session.time < 10000) && (
                            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-sm text-center mb-4 animate-pulse">
                                Tienes progreso guardado en <b>{quizData[session.topic].title}</b> (Se borrará en unos segundos).
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(quizData).map(([key, data]) => (
                                <button 
                                    key={key} 
                                    onClick={() => startQuiz(key)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition shadow-md"
                                >
                                    {data.title}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            }

            if (view === 'results') {
                return (
                    <div className="bg-white p-8 rounded-xl shadow-lg mt-10 text-center">
                        <h2 className="text-3xl font-bold mb-4">¡Has terminado!</h2>
                        <div className="text-xl mb-6">
                            <p className="text-green-600 font-bold">Correctas: {correct}</p>
                            <p className="text-red-600 font-bold">Incorrectas: {wrong}</p>
                            <p className="text-gray-700 mt-4 text-2xl">Puntaje: {(correct / 10) * 100}%</p>
                        </div>
                        <button 
                            onClick={() => { setSession(null); setView('menu'); }}
                            className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg"
                        >
                            Volver al Menú Principal
                        </button>
                    </div>
                );
            }

            const currentData = quizData[topic].questions[currentQ];

            return (
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mt-10">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={backToMenu} className="text-slate-500 hover:text-slate-800 font-semibold flex items-center">
                            ← Volver al Menú
                        </button>
                        <div className="text-sm font-bold flex gap-4">
                            <span className="text-green-600">✔ {correct}</span>
                            <span className="text-red-600">✖ {wrong}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <span className="text-indigo-600 font-bold text-sm uppercase tracking-wide">{quizData[topic].title} - Pregunta {currentQ + 1} de 10</span>
                        <h2 className="text-2xl font-semibold mt-2">{currentData.q}</h2>
                    </div>

                    <div className="space-y-3 mb-6">
                        {currentData.options.map((opt, i) => {
                            let btnClass = "w-full text-left font-medium py-3 px-5 rounded-lg border-2 transition-all duration-200 ";
                            
                            if (!isAnswered) {
                                btnClass += "border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700";
                            } else {
                                if (opt === currentData.a) {
                                    btnClass += "border-green-500 bg-green-50 text-green-800"; // Correcta
                                } else if (opt === selected) {
                                    btnClass += "border-red-500 bg-red-50 text-red-800"; // Seleccionada incorrecta
                                } else {
                                    btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-60"; // Demás opciones
                                }
                            }

                            return (
                                <button key={i} onClick={() => handleAnswer(opt)} className={btnClass} disabled={isAnswered}>
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <div className={`p-4 rounded-lg mb-6 ${selected === currentData.a ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                            <p className="font-bold text-lg">{selected === currentData.a ? '¡Correcto!' : 'Incorrecto'}</p>
                            <p className="mt-1">{currentData.exp}</p>
                        </div>
                    )}

                    {isAnswered && (
                        <button onClick={nextQuestion} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            {currentQ === 9 ? 'Ver Resultados' : 'Siguiente Pregunta'}
                        </button>
                    )}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>