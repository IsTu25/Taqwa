import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const QUIZ_QUESTIONS = [
  {
    question: 'How many Surahs are there in the Quran?',
    options: ['112', '114', '120', '100'],
    answer: 1,
  },
  {
    question: 'Which prophet was swallowed by a whale?',
    options: ['Musa (AS)', 'Isa (AS)', 'Yunus (AS)', 'Nuh (AS)'],
    answer: 2,
  },
  {
    question: 'What is the longest Surah in the Quran?',
    options: ['Al-Fatiha', 'Al-Kahf', 'Al-Imran', 'Al-Baqarah'],
    answer: 3,
  },
  {
    question: 'Which angel is responsible for blowing the trumpet on the Day of Judgment?',
    options: ['Jibril', 'Mikail', 'Israfil', 'Izrail'],
    answer: 2,
  },
  {
    question: 'How many years did it take for the Quran to be revealed?',
    options: ['10', '23', '40', '15'],
    answer: 1,
  },
];

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === QUIZ_QUESTIONS[currentIndex].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  if (showResult) {
    return (
      <View style={styles.centered}>
        <Text style={styles.resultTitle}>Quiz Completed!</Text>
        <Text style={styles.scoreText}>Your Score: {score} / {QUIZ_QUESTIONS.length}</Text>
        <TouchableOpacity style={styles.button} onPress={restartQuiz}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = QUIZ_QUESTIONS[currentIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.progress}>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</Text>
      <Text style={styles.question}>{q.question}</Text>

      {q.options.map((opt, idx) => {
        let bgColor = '#1B4332';
        let borderColor = 'rgba(212, 175, 55, 0.2)';
        
        if (selectedOption !== null) {
          if (idx === q.answer) {
            bgColor = 'rgba(46, 204, 113, 0.2)';
            borderColor = '#2ECC71';
          } else if (idx === selectedOption) {
            bgColor = 'rgba(231, 76, 60, 0.2)';
            borderColor = '#E74C3C';
          }
        }

        return (
          <TouchableOpacity
            key={idx}
            style={[styles.option, { backgroundColor: bgColor, borderColor }]}
            onPress={() => handleSelect(idx)}
            activeOpacity={0.8}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  content: { padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#0F2F20' },
  progress: { color: '#D4AF37', fontSize: 14, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  question: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', lineHeight: 32 },
  option: {
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  optionText: { color: '#FFF', fontSize: 16, fontWeight: '500' },
  resultTitle: { color: '#D4AF37', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  scoreText: { color: '#FFF', fontSize: 20, marginBottom: 40 },
  button: { backgroundColor: '#D4AF37', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 30 },
  buttonText: { color: '#0F2F20', fontSize: 16, fontWeight: 'bold' },
});
