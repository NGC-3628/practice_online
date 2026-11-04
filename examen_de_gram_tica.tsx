import React, { useState, useEffect } from 'react';

// === BASE DE DATOS DE PREGUNTAS ===
const quizData = {
  'will-going-to': {
    title: 'Will vs Going To',
    questions: [
      {
        question: "Look at those dark clouds! It ___ soon.",
        options: ["is going to rain", "will rain", "rains"],
        correct: "is going to rain",
        explanation: "'is going to' se usa para predicciones basadas en evidencia física presente (las nubes oscuras). 'will' se usaría si solo fuera una creencia sin evidencia visual inmediata."
      },
      {
        question: "I don't have my wallet. - Don't worry, I ___ pay for the lunch.",
        options: ["am going to", "will", "pay"],
        correct: "will",
        explanation: "'will' se usa para decisiones rápidas o espontáneas tomadas en el momento de hablar. No había un plan previo de pagar su almuerzo, surgió en el momento."
      },
      {
        question: "We ___ visit our grandparents next weekend. We bought the tickets.",
        options: ["will", "are going to", "visit"],
        correct: "are going to",
        explanation: "Como ya se compraron los boletos, es un plan o intención definitiva en el futuro. Para planes ya hechos se utiliza 'going to'."
      },
      {
        question: "I think humanity ___ live on Mars in the future.",
        options: ["will", "is going to", "lives"],
        correct: "will",
        explanation: "Usamos 'will' para predicciones generales, suposiciones o creencias sobre el futuro lejano, especialmente después de verbos como 'think' o 'believe'."
      },
      {
        question: "Watch out! You ___ drop those plates!",
        options: ["will", "are going to", "are dropping"],
        correct: "are going to",
        explanation: "Es una advertencia basada en una situación inminente que se está viendo ocurrir. 'Going to' es correcto aquí porque la acción está a punto de suceder."
      },
      {
        question: "I promise I ___ tell anyone your secret.",
        options: ["won't", "am not going to", "don't"],
        correct: "won't",
        explanation: "Para promesas, juramentos o rechazos, siempre usamos 'will' (o su forma negativa 'won't')."
      },
      {
        question: "They ___ get married in July. The church is booked.",
        options: ["will", "are going to", "get"],
        correct: "are going to",
        explanation: "Tienen la iglesia reservada, por lo que es un plan completamente organizado y decidido de antemano. 'Going to' es la opción correcta."
      },
      {
        question: "The phone is ringing. I ___ get it.",
        options: ["am going to", "will", "getting"],
        correct: "will",
        explanation: "Es una decisión tomada en el momento exacto en el que suena el teléfono. Para decisiones instantáneas se usa 'will'."
      },
      {
        question: "Next year, I ___ be 18 years old.",
        options: ["am going to", "will", "am"],
        correct: "will",
        explanation: "Para hablar de hechos futuros o cosas que son inevitables (como la edad o el paso del tiempo), se usa 'will'."
      },
      {
        question: "She ___ have a baby in December. The doctor confirmed it.",
        options: ["will", "is going to", "has"],
        correct: "is going to",
        explanation: "Es un hecho futuro basado en evidencia clínica presente confirmada. Por lo tanto, 'going to' es necesario aquí."
      }
    ]
  },
  'reflexive-pronouns': {
    title: 'Reflexive Pronouns',
    questions: [
      {
        question: "I cut ___ while cooking dinner.",
        options: ["me", "myself", "mine"],
        correct: "myself",
        explanation: "El sujeto (I) y el objeto de la acción son la misma persona. Usamos el reflexivo 'myself'."
      },
      {
        question: "She looked at ___ in the mirror.",
        options: ["her", "herself", "she"],
        correct: "herself",
        explanation: "La acción de mirar recae sobre el mismo sujeto (She), por lo que usamos 'herself'. 'Her' indicaría que miró a otra mujer."
      },
      {
        question: "We enjoyed ___ at the party.",
        options: ["ourselves", "us", "our"],
        correct: "ourselves",
        explanation: "'We' requiere el pronombre reflexivo 'ourselves'. 'Us' se usaría si la acción recayera en nosotros pero proveniente de otra persona."
      },
      {
        question: "They fixed the car by ___.",
        options: ["them", "theirselves", "themselves"],
        correct: "themselves",
        explanation: "'Themselves' es la forma correcta para el plural de 'they'. La palabra 'theirselves' no existe en inglés estándar."
      },
      {
        question: "He taught ___ how to play the guitar.",
        options: ["him", "himself", "his"],
        correct: "himself",
        explanation: "Él mismo fue su propio maestro. La acción recae sobre el sujeto (He), requiriendo 'himself'."
      },
      {
        question: "The cat cleaned ___ after eating.",
        options: ["it", "itself", "himself"],
        correct: "itself",
        explanation: "Para animales (cuando no se especifica el género de forma afectiva) o cosas, usamos 'itself'."
      },
      {
        question: "You guys need to do the homework by ___.",
        options: ["yourself", "yourselves", "you"],
        correct: "yourselves",
        explanation: "Al decir 'You guys', queda claro que es plural (ustedes). El reflexivo plural para la segunda persona es 'yourselves'."
      },
      {
        question: "John, I want you to believe in ___.",
        options: ["yourself", "yourselves", "you"],
        correct: "yourself",
        explanation: "Al dirigirse solo a 'John' (singular), el pronombre reflexivo correcto es 'yourself'."
      },
      {
        question: "The machine works by ___.",
        options: ["it", "itself", "himself"],
        correct: "itself",
        explanation: "La máquina es un objeto inanimado que realiza la acción por su cuenta. Le corresponde 'itself'."
      },
      {
        question: "Mary bought a gift for ___.",
        options: ["her", "herself", "hers"],
        correct: "herself",
        explanation: "Mary es el sujeto y al mismo tiempo la receptora del regalo, por lo tanto usamos 'herself'."
      }
    ]
  },
  'should-shouldnt': {
    title: "Should and Shouldn't",
    questions: [
      {
        question: "You have a headache. You ___ rest.",
        options: ["should", "shouldn't", "will"],
        correct: "should",
        explanation: "'Should' se usa para dar un buen consejo o sugerencia. Si le duele la cabeza, lo recomendable es descansar."
      },
      {
        question: "It's raining. She ___ forget her umbrella.",
        options: ["should", "shouldn't", "won't"],
        correct: "shouldn't",
        explanation: "El consejo lógico es negativo: no debería olvidar su paraguas porque está lloviendo."
      },
      {
        question: "They ___ eat so much junk food if they want to be fit.",
        options: ["should", "shouldn't", "are going to"],
        correct: "shouldn't",
        explanation: "Comer mucha comida chatarra es malo si quieres estar en forma, así que sugerimos no hacerlo usando 'shouldn't'."
      },
      {
        question: "You ___ brush your teeth twice a day.",
        options: ["shouldn't", "should", "will"],
        correct: "should",
        explanation: "Lavarse los dientes es un buen hábito y una recomendación positiva, por lo que usamos 'should'."
      },
      {
        question: "He looks very tired. He ___ go to bed late.",
        options: ["should", "shouldn't", "is going to"],
        correct: "shouldn't",
        explanation: "Si está cansado, la recomendación es evitar dormir tarde, por lo que 'shouldn't' es la respuesta correcta."
      },
      {
        question: "If you want to learn English, you ___ practice every day.",
        options: ["should", "shouldn't", "won't"],
        correct: "should",
        explanation: "Practicar a diario es una recomendación altamente positiva para lograr el objetivo, así que usamos 'should'."
      },
      {
        question: "We ___ talk loudly in the library.",
        options: ["should", "shouldn't", "will"],
        correct: "shouldn't",
        explanation: "En una biblioteca se exige silencio, por lo tanto 'no deberíamos' (shouldn't) hablar fuerte."
      },
      {
        question: "___ I buy the red shirt or the blue one?",
        options: ["Should", "Shouldn't", "Will"],
        correct: "Should",
        explanation: "Al pedir consejo o sugerencia sobre qué decisión tomar, formulamos la pregunta empezando con 'Should'."
      },
      {
        question: "It's cold outside. You ___ wear a jacket.",
        options: ["shouldn't", "should", "are going to"],
        correct: "should",
        explanation: "Hace frío, lo razonable y aconsejable es usar chamarra, por lo tanto 'should'."
      },
      {
        question: "He ___ drive so fast on this road. It's dangerous.",
        options: ["should", "shouldn't", "will"],
        correct: "shouldn't",
        explanation: "Es peligroso, así que el consejo es negativo: no debería conducir rápido ('shouldn't')."
      }
    ]
  },
  'question-tags': {
    title: 'Question Tags',
    questions: [
      {
        question: "You are a student, ___?",
        options: ["are you", "aren't you", "isn't it"],
        correct: "aren't you",
        explanation: "Si la oración principal es afirmativa con el verbo 'to be' (are), el question tag debe ser negativo (aren't) con el mismo pronombre."
      },
      {
        question: "She isn't coming to the party, ___?",
        options: ["isn't she", "is she", "does she"],
        correct: "is she",
        explanation: "La oración es negativa (isn't), por lo que el tag debe ser afirmativo usando el mismo verbo auxiliar (is) y pronombre (she)."
      },
      {
        question: "He plays tennis very well, ___?",
        options: ["doesn't he", "does he", "isn't he"],
        correct: "doesn't he",
        explanation: "La oración está en presente simple afirmativo. Para formar el tag, necesitamos el auxiliar negativo para 'He', que es 'doesn't'."
      },
      {
        question: "They didn't go to school yesterday, ___?",
        options: ["did they", "didn't they", "do they"],
        correct: "did they",
        explanation: "La oración usa pasado simple negativo (didn't). El tag pasa a afirmativo usando el mismo auxiliar en pasado (did)."
      },
      {
        question: "We have finished the project, ___?",
        options: ["have we", "haven't we", "don't we"],
        correct: "haven't we",
        explanation: "Es una oración en presente perfecto afirmativa (have finished), el tag debe ser negativo con el mismo auxiliar (haven't we)."
      },
      {
        question: "You will call me, ___?",
        options: ["will you", "won't you", "don't you"],
        correct: "won't you",
        explanation: "Si se usa 'will' afirmativo, el question tag debe ser la forma negativa 'won't' acompañada del sujeto."
      },
      {
        question: "She can speak English, ___?",
        options: ["can't she", "can she", "doesn't she"],
        correct: "can't she",
        explanation: "Para los verbos modales como 'can', se usa el mismo modal en negativo para el tag ('can't')."
      },
      {
        question: "I am late, ___?",
        options: ["am I not", "aren't I", "amn't I"],
        correct: "aren't I",
        explanation: "Excepción importante: Para 'I am' en oraciones afirmativas, el question tag correcto y aceptado en inglés es 'aren't I?' (no existe 'amn't')."
      },
      {
        question: "It was a great movie, ___?",
        options: ["wasn't it", "was it", "didn't it"],
        correct: "wasn't it",
        explanation: "El verbo 'to be' en pasado (was) afirmativo cambia a negativo (wasn't) con el sujeto 'it'."
      },
      {
        question: "Let's go to the beach, ___?",
        options: ["will we", "shall we", "don't we"],
        correct: "shall we",
        explanation: "Excepción importante: Todas las oraciones que empiezan con 'Let's' (sugerencias) usan siempre 'shall we?' como question tag."
      }
    ]
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'quiz', 'summary'
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Estado activo del quiz
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  
  // Estado para la pregunta actual
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Estado de las sesiones guardadas para la regla de los 10 segundos
  const [savedSessions, setSavedSessions] = useState({});

  // Manejar el inicio o recuperación de un quiz
  const handleStartQuiz = (topicKey) => {
    const session = savedSessions[topicKey];
    const now = Date.now();
    
    // Verificar si hay una sesión previa y si pasó menos de 10 segundos (10,000 ms)
    if (session && now - session.exitTimestamp <= 10000) {
      setCurrentIndex(session.currentIndex);
      setCorrectCount(session.correctCount);
      setIncorrectCount(session.incorrectCount);
    } else {
      // Reiniciar todo si no hay sesión o pasaron más de 10 segundos
      setCurrentIndex(0);
      setCorrectCount(0);
      setIncorrectCount(0);
    }
    
    setSelectedTopic(topicKey);
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentView('quiz');
  };

  // Guardar estado al salir al menú
  const handleBackToMenu = () => {
    if (currentView === 'quiz') {
      setSavedSessions(prev => ({
        ...prev,
        [selectedTopic]: {
          currentIndex,
          correctCount,
          incorrectCount,
          exitTimestamp: Date.now()
        }
      }));
    }
    setCurrentView('menu');
  };

  // Manejar la selección de una respuesta
  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    const correct = quizData[selectedTopic].questions[currentIndex].correct;
    if (option === correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }
  };

  // Manejar avanzar a la siguiente pregunta o terminar
  const handleNextQuestion = () => {
    if (currentIndex < quizData[selectedTopic].questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Borrar la sesión guardada al completar el quiz para que se reinicie si lo vuelven a tomar
      setSavedSessions(prev => {
        const newSessions = { ...prev };
        delete newSessions[selectedTopic];
        return newSessions;
      });
      setCurrentView('summary');
    }
  };

  // ================= RENDER DE VISTAS =================

  // VISTA: Menú Principal
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">Examen de Gramática</h1>
          <p className="text-center text-slate-500 mb-6">Selecciona un tema para comenzar (10 preguntas por tema).</p>
          <div className="space-y-4">
            {Object.entries(quizData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => handleStartQuiz(key)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                {data.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // VISTA: Resumen (Final del quiz)
  if (currentView === 'summary') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">¡Has terminado!</h2>
          <p className="text-xl mb-6">Puntaje final: <span className="font-bold text-indigo-600">{correctCount} / 10</span></p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
              Correctas: {correctCount}
            </div>
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold">
              Incorrectas: {incorrectCount}
            </div>
          </div>
          
          <button
            onClick={handleBackToMenu}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Volver al Menú Principal
          </button>
        </div>
      </div>
    );
  }

  // VISTA: Quiz Activo
  const currentQuestionData = quizData[selectedTopic].questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-2xl w-full">
        
        {/* Barra Superior */}
        <div className="flex justify-between items-center bg-white p-4 rounded-t-xl shadow-sm border-b">
          <button 
            onClick={handleBackToMenu}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center transition"
          >
            ← Volver al Menú
          </button>
          <div className="flex space-x-3 text-sm font-semibold">
            <span className="text-green-600 bg-green-50 px-2 py-1 rounded">Correctas: {correctCount}</span>
            <span className="text-red-600 bg-red-50 px-2 py-1 rounded">Incorrectas: {incorrectCount}</span>
          </div>
        </div>

        {/* Contenido de la Pregunta */}
        <div className="bg-white p-8 rounded-b-xl shadow-lg">
          <div className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wide">
            {quizData[selectedTopic].title} - Pregunta {currentIndex + 1} de 10
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {currentQuestionData.question}
          </h2>

          <div className="space-y-3 mb-6">
            {currentQuestionData.options.map((option, index) => {
              // Lógica de estilos de botones
              let btnClass = "w-full text-left font-medium py-3 px-5 rounded-lg border-2 transition-all duration-200 ";
              
              if (!isAnswered) {
                btnClass += "border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700";
              } else {
                if (option === currentQuestionData.correct) {
                  btnClass += "border-green-500 bg-green-500 text-white"; // La correcta siempre en verde
                } else if (option === selectedOption) {
                  btnClass += "border-red-500 bg-red-500 text-white"; // La mala que seleccionó, en rojo
                } else {
                  btnClass += "border-slate-200 bg-slate-100 text-slate-400 opacity-60"; // Las demás deshabilitadas visualmente
                }
              }

              return (
                <button
                  key={index}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(option)}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Retroalimentación (Se muestra solo tras responder) */}
          {isAnswered && (
            <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${selectedOption === currentQuestionData.correct ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 'bg-red-100 text-red-800 border-l-4 border-red-500'}`}>
              <p className="mb-1 font-bold text-base">
                {selectedOption === currentQuestionData.correct ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p>{currentQuestionData.explanation}</p>
            </div>
          )}

          {/* Botón Siguiente */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                {currentIndex === 9 ? 'Ver Resultados' : 'Siguiente Pregunta'}
              </button>
            </div>
          )}
        </div>
        
        {/* Aviso de la regla de los 10 segundos */}
        <p className="text-center text-xs text-slate-400 mt-4">
          * Si vuelves al menú y regresas al mismo quiz antes de 10 segundos, tu progreso no se perderá.
        </p>

      </div>
    </div>
  );
}