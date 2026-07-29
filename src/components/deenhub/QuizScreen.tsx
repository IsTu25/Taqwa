import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { generateQuizQuestions, QuizQuestion } from '../../services/aiService';

export default function QuizScreen() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    setLoading(true);
    setShowResult(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    
    // Generate 5 new questions using Gemini AI
    const generated = await generateQuizQuestions(5);
    setQuestions(generated);
    setLoading(false);
  };

  // Fetch questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === questions[currentIndex].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1500); // 1.5 seconds delay so they can read the right answer
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text style={styles.loadingText}>Gemini AI is generating new questions...</Text>
      </View>
    );
  }

  if (showResult || questions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.resultTitle}>Quiz Completed!</Text>
        <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchQuestions}>
          <Text style={styles.buttonText}>Generate New Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[currentIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.aiBadge}>✨ Powered by Gemini AI</Text>
      <Text style={styles.progress}>Question {currentIndex + 1} of {questions.length}</Text>
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
  loadingText: { color: '#D4AF37', marginTop: 16, fontWeight: '600' },
  aiBadge: { color: '#A0A0A0', fontSize: 12, textAlign: 'center', marginBottom: 10, fontStyle: 'italic' },
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
