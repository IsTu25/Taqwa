import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ImageBackground, Alert, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addDeed, addSin, setScore } from '../../store/taqwaSlice';
import { Check, AlertTriangle, Book } from 'lucide-react-native';
import AmbientGlow from '../../components/AmbientGlow';
import { getDailyAISuggestion, evaluateDeedWithGemini } from '../../services/aiService';
import { syncScoreToFirestore, fetchTodayScoreFromFirestore } from '../../services/dbService';
import { auth } from '../../services/firebase';

export default function Taqwa() {
  const score = useSelector((state: RootState) => state.taqwa.score);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [userDeedText, setUserDeedText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('Loading daily suggestion...');
  const isInitialMount = useRef(true);

  const isPositive = score >= 0;

  // Initial load: Fetch today's score from Firestore
  useEffect(() => {
    const initScore = async () => {
      // Wait a moment for anonymous auth to complete if app just launched
      setTimeout(async () => {
        const savedScore = await fetchTodayScoreFromFirestore();
        if (savedScore !== null) {
          dispatch(setScore(savedScore));
        }
      }, 1000);
    };
    initScore();
  }, []);

  // Sync to Firestore whenever score changes (but skip the initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    syncScoreToFirestore(score);
  }, [score]);

  useEffect(() => {
    // Fetch AI suggestion when the app loads or score changes significantly
    // In a real app, this might only be fetched once per day
    const fetchSuggestion = async () => {
      const suggestion = await getDailyAISuggestion(score);
      setAiSuggestion(suggestion);
    };
    fetchSuggestion();
  }, [isPositive]); // Only refetch if the polarity changes

  const handleEvaluateDeed = async () => {
    if (!userDeedText.trim()) return;
    setIsEvaluating(true);
    const result = await evaluateDeedWithGemini(userDeedText);
    setIsEvaluating(false);

    if (result.type === 'good') {
      Alert.alert("MashaAllah!", result.reference + "\n\nPoints Awarded: +" + result.points, [
        {
          text: "OK",
          onPress: () => {
            dispatch(addDeed(result.points));
            setModalVisible(false);
            setUserDeedText('');
          },
        },
      ]);
    } else {
      Alert.alert("Astaghfirullah", result.reference + "\n\nPoints Deducted: -" + result.points, [
        {
          text: "OK",
          style: "destructive",
          onPress: () => {
            dispatch(addSin(result.points));
            setModalVisible(false);
            setUserDeedText('');
          },
        },
      ]);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/images/3rd  page.png')} style={styles.backgroundImage}>
      <SafeAreaView style={[styles.container, isPositive ? styles.positiveBg : styles.negativeBg]}>
      {/* Ambient background glow (Jannat = green, Istighfar = red/orange) */}
      <AmbientGlow mode={isPositive ? 'positive' : 'negative'} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Taqwa Points:</Text>
          <Text style={[styles.scoreValue, { color: isPositive ? '#D4AF37' : '#FF4444' }]}>
            {score.toLocaleString()}
          </Text>
        </View>

        {/* AI Suggestion */}
        <View style={styles.suggestionCard}>
          <Text style={styles.suggestionTitle}>Daily AI Suggestion</Text>
          <Text style={styles.suggestionText}>
            {aiSuggestion}
          </Text>
          <View style={styles.checkIcon}>
            <Check color="#D4AF37" size={20} />
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.logButton}
          onPress={() => setModalVisible(true)}
        >
          <Book color="#D4AF37" size={24} />
          <Text style={styles.logButtonText}>Deed Log</Text>
        </TouchableOpacity>

        {/* Dynamic Content */}
        <View style={styles.dynamicContent}>
          {isPositive ? (
            <>
              <Text style={styles.verseText}>"Verily, with hardship comes ease."</Text>
              <Text style={styles.verseSource}>- Quran 94:6</Text>
              <Text style={styles.arabicText}>ٱلْحَمْدُ لِلَّٰهِ</Text>
            </>
          ) : (
            <>
              <Text style={styles.warningText}>
                **You are accumulating sins! Repent now and do good deeds before it's too late**
              </Text>
              <View style={styles.warningIconContainer}>
                <AlertTriangle color="#FF4444" size={40} />
                <Text style={styles.arabicTextNegative}>أستغفر الله</Text>
                <AlertTriangle color="#FF4444" size={40} />
              </View>
            </>
          )}
        </View>

        {/* Modal for Logging Deeds/Sins */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Log Activity</Text>
              
              <Text style={styles.inputLabel}>What did you do today?</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. I helped my neighbor carry groceries..."
                placeholderTextColor="#A0A0A0"
                multiline
                value={userDeedText}
                onChangeText={setUserDeedText}
              />

              <TouchableOpacity 
                style={[styles.submitButton, (!userDeedText.trim() || isEvaluating) && styles.submitButtonDisabled]}
                onPress={handleEvaluateDeed}
                disabled={!userDeedText.trim() || isEvaluating}
              >
                {isEvaluating ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Evaluate Deed</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  positiveBg: {
    backgroundColor: 'transparent',
  },
  negativeBg: {
    backgroundColor: 'rgba(48, 0, 0, 0.5)',
  },
  scrollContent: {
    padding: 20,
    marginTop: 20,
  },
  scoreCard: {
    backgroundColor: '#1B4332',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 10,
  },
  suggestionCard: {
    backgroundColor: '#1B4332',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
    marginBottom: 20,
    position: 'relative',
  },
  suggestionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestionText: {
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 20,
    paddingRight: 30,
  },
  checkIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  logButton: {
    flexDirection: 'row',
    backgroundColor: '#1B4332',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
    marginBottom: 40,
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dynamicContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  verseText: {
    color: '#D4AF37',
    fontSize: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  verseSource: {
    color: '#A0A0A0',
    fontSize: 16,
    marginBottom: 30,
  },
  arabicText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  warningText: {
    color: '#FF4444',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    lineHeight: 24,
  },
  warningIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  arabicTextNegative: {
    color: '#FF4444',
    fontSize: 40,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0A192F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#1B4332',
    color: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    borderColor: '#D4AF37',
    borderWidth: 1,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#1B4332',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});