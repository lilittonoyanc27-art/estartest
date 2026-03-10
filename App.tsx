import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  ArrowRight,
  BookOpen,
  Star,
  Info,
  Sparkles,
  HelpCircle
} from 'lucide-react';

// --- Types ---

interface Question {
  id: number;
  phraseArm: string;
  correctSp: string;
  options: string[];
  explanation: string;
}

// --- Data ---

const QUIZ_DATA: Question[] = [
  { id: 1, phraseArm: "Այս աղջիկը", correctSp: "Esta chica", options: ["Esta chica", "Está chica"], explanation: "'Esta' (առանց շեշտի) նշանակում է «Այս»:" },
  { id: 2, phraseArm: "Նա տանն է", correctSp: "Ella está en casa", options: ["Ella esta en casa", "Ella está en casa"], explanation: "'Está' (շեշտով) նշանակում է «Գտնվում է / Է»:" },
  { id: 3, phraseArm: "Այս սեղանը", correctSp: "Esta mesa", options: ["Esta mesa", "Está mesa"], explanation: "'Esta' օգտագործվում է որպես ցուցական որոշիչ (Այս):" },
  { id: 4, phraseArm: "Որտե՞ղ է Մարիան", correctSp: "¿Dónde está María?", options: ["¿Dónde esta María?", "¿Dónde está María?"], explanation: "Գտնվելու վայրի համար օգտագործվում է 'Está' (շեշտով):" },
  { id: 5, phraseArm: "Այս երգը", correctSp: "Esta canción", options: ["Esta canción", "Está canción"], explanation: "'Esta' (Այս) + գոյական:" },
  { id: 6, phraseArm: "Սուրճը տաք է", correctSp: "El café está caliente", options: ["El café esta caliente", "El café está caliente"], explanation: "Վիճակ նկարագրելու համար օգտագործվում է 'Está':" },
  { id: 7, phraseArm: "Այս էջը", correctSp: "Esta página", options: ["Esta página", "Está página"], explanation: "'Esta' (Այս) + գոյական:" },
  { id: 8, phraseArm: "Հեռախոսը սեղանի վրա է", correctSp: "El teléfono está en la mesa", options: ["El teléfono esta en la mesa", "El teléfono está en la mesa"], explanation: "Տեղադրության համար միշտ 'Está':" },
  { id: 9, phraseArm: "Այս լամպը", correctSp: "Esta lámpara", options: ["Esta lámpara", "Está lámpara"], explanation: "'Esta' (Այս) + գոյական:" },
  { id: 10, phraseArm: "Խուանը հիվանդ է", correctSp: "Juan está enfermo", options: ["Juan esta enfermo", "Juan está enfermo"], explanation: "Առողջական վիճակի համար օգտագործվում է 'Está':" }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUIZ_DATA[currentIdx];
  const progress = ((currentIdx + 1) / QUIZ_DATA.length) * 100;

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.correctSp;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < QUIZ_DATA.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#1e40af] bg-gradient-to-b from-[#1e40af] to-[#3b82f6] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex flex-col gap-4 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-6 h-6 text-blue-200" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Esta vs Está</h1>
          </div>
          <div className="text-sm font-bold bg-white/20 px-4 py-2 rounded-full border border-white/30">
            {currentIdx + 1} / {QUIZ_DATA.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-4 max-w-2xl mx-auto w-full overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full -z-10" />

        {/* Theory Section */}
        {!showResults && currentIdx === 0 && selectedOption === null && (
          <motion.section 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full mb-8 bg-white/10 backdrop-blur-xl rounded-[32px] p-6 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Info className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black uppercase tracking-tight">Կանոններ</h2>
            </div>
            <div className="space-y-4 text-sm">
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                <p className="font-black text-blue-300 text-lg mb-1">Esta (առանց շեշտի)</p>
                <p className="text-blue-100 italic">Նշանակում է <span className="text-white font-bold">«Այս»</span> (իգական սեռ):</p>
                <p className="text-[10px] opacity-50 mt-1">Օրինակ՝ Esta mesa (Այս սեղանը)</p>
              </div>
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                <p className="font-black text-blue-300 text-lg mb-1">Está (շեշտով)</p>
                <p className="text-blue-100 italic">Նշանակում է <span className="text-white font-bold">«Գտնվում է / Է»</span> (Estar բայ):</p>
                <p className="text-[10px] opacity-50 mt-1">Օրինակ՝ Él está aquí (Նա այստեղ է)</p>
              </div>
            </div>
          </motion.section>
        )}

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentIdx}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="w-full"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl flex flex-col gap-8">
                
                {/* Question Area */}
                <div className="text-center space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">Թարգմանեք իսպաներեն</span>
                  <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white drop-shadow-lg">
                    {currentQuestion.phraseArm}
                  </h2>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = selectedOption === option;
                    const isCorrectOption = option === currentQuestion.correctSp;
                    
                    let btnClass = "bg-white/10 hover:bg-white/20 border-white/10 text-white";
                    if (selectedOption !== null) {
                      if (isCorrectOption) {
                        btnClass = "bg-green-500/40 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                      } else if (isSelected) {
                        btnClass = "bg-red-500/40 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                      } else {
                        btnClass = "bg-white/5 border-white/5 opacity-30 text-white/50";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        disabled={selectedOption !== null}
                        className={`p-6 rounded-2xl border-2 font-black text-xl transition-all active:scale-95 flex items-center justify-between ${btnClass}`}
                      >
                        {option}
                        {selectedOption !== null && isCorrectOption && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                        {selectedOption !== null && isSelected && !isCorrectOption && <XCircle className="w-6 h-6 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Area */}
                <AnimatePresence>
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className={`p-5 rounded-2xl flex flex-col gap-2 ${
                        isCorrect ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        <div className="flex items-center gap-2 font-black">
                          <HelpCircle className="w-5 h-5" />
                          <span>Բացատրություն.</span>
                        </div>
                        <p className="text-sm opacity-90 font-medium leading-relaxed">{currentQuestion.explanation}</p>
                      </div>
                      
                      <button
                        onClick={nextQuestion}
                        className="w-full py-5 bg-white text-[#1e40af] rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        {currentIdx === QUIZ_DATA.length - 1 ? 'Արդյունքներ' : 'Հաջորդը'}
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-[40px] p-12 border border-white/20 shadow-2xl text-center w-full"
            >
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#1e40af] shadow-2xl">
                  <Trophy className="w-12 h-12" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border-2 border-dashed border-white/30 rounded-full"
                />
              </div>

              <h2 className="text-4xl font-black mb-4">Ավարտվեց:</h2>
              <div className="flex items-center justify-center gap-2 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-8 h-8 ${i < Math.round((score/10)*5) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                ))}
              </div>

              <p className="text-xl text-blue-100 mb-10">
                Դուք հավաքեցիք <span className="text-white font-black text-4xl">{score}</span> միավոր {QUIZ_DATA.length}-ից:
              </p>
              
              <button
                onClick={resetQuiz}
                className="w-full py-5 bg-white text-[#1e40af] rounded-[24px] font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-6 h-6" />
                Կրկնել թեստը
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/40 text-[10px] font-bold tracking-widest uppercase">
        Իսպաներենի Դասընթաց • Esta vs Está
      </footer>
    </div>
  );
}
