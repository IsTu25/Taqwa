import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { getFeatureBySlug } from '../../../config/deenHubFeatures';
import DetailHeader from '../../../components/deenhub/DetailHeader';
import TasbihScreen from '../../../components/deenhub/TasbihScreen';
import QiblaScreen from '../../../components/deenhub/QiblaScreen';
import ZakatScreen from '../../../components/deenhub/ZakatScreen';
import DuaScreen from '../../../components/deenhub/DuaScreen';
import HadithScreen from '../../../components/deenhub/HadithScreen';
import NamazGuideScreen from '../../../components/deenhub/NamazGuideScreen';
import MasailScreen from '../../../components/deenhub/MasailScreen';
import QuranScreen from '../../../components/deenhub/QuranScreen';
import PrayerTimesScreen from '../../../components/deenhub/PrayerTimesScreen';
import PlaceholderScreen from '../../../components/deenhub/PlaceholderScreen';
import BayanScreen from '../../../components/deenhub/BayanScreen';
import QuizScreen from '../../../components/deenhub/QuizScreen';
import BooksScreen from '../../../components/deenhub/BooksScreen';
import RozaScreen from '../../../components/deenhub/RozaScreen';
import QuranLearningScreen from '../../../components/deenhub/QuranLearningScreen';
import HajjUmrahScreen from '../../../components/deenhub/HajjUmrahScreen';
import ArticlesScreen from '../../../components/deenhub/ArticlesScreen';
import TafseerScreen from '../../../components/deenhub/TafseerScreen';
export default function DeenHubDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    return (
      <SafeAreaView style={styles.container}>
        <PlaceholderScreen name="Not Found" description="This feature doesn't exist." />
      </SafeAreaView>
    );
  }

  const renderBody = () => {
    switch (feature.type) {
      case 'tasbih':
        return <TasbihScreen />;
      case 'qibla':
        return <QiblaScreen />;
      case 'zakat':
        return <ZakatScreen />;
      case 'dua':
        return <DuaScreen />;
      case 'hadith':
        return <HadithScreen />;
      case 'namazguide':
        return <NamazGuideScreen />;
      case 'masail':
        return <MasailScreen />;
      case 'quran':
        return <QuranScreen />;
      case 'prayertimes':
        return <PrayerTimesScreen />;
      case 'bayan':
        return <BayanScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'books':
        return <BooksScreen />;
      case 'roza':
        return <RozaScreen />;
      case 'quranlearning':
        return <QuranLearningScreen />;
      case 'hajjumrah':
        return <HajjUmrahScreen />;
      case 'articles':
        return <ArticlesScreen />;
      case 'tafseer':
        return <TafseerScreen />;
      default:
        return <PlaceholderScreen name={feature.name} description={feature.description} />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <DetailHeader title={feature.name} />
      <View style={styles.body}>{renderBody()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2F20' },
  body: { flex: 1 },
});
