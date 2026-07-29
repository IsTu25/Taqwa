import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';

const ZAKAT_RATE = 0.025;
// Nisab reference (approx. value of 87.48g gold). Editable by the user for accuracy.
const DEFAULT_NISAB_BDT = 800000;

export default function ZakatScreen() {
  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [investments, setInvestments] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [nisab, setNisab] = useState(String(DEFAULT_NISAB_BDT));

  const num = (v: string) => parseFloat(v.replace(/,/g, '')) || 0;

  const { totalWealth, netWealth, zakatDue, isEligible } = useMemo(() => {
    const total = num(cash) + num(gold) + num(investments);
    const net = total - num(liabilities);
    const eligible = net >= num(nisab);
    return {
      totalWealth: total,
      netWealth: net,
      zakatDue: eligible ? net * ZAKAT_RATE : 0,
      isEligible: eligible,
    };
  }, [cash, gold, investments, liabilities, nisab]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.note}>
        Enter approximate values in your currency (BDT). Zakat is 2.5% of wealth held for one
        lunar year, above the Nisab threshold.
      </Text>

      <Field label="Cash & Bank Savings" value={cash} onChange={setCash} />
      <Field label="Gold & Silver (market value)" value={gold} onChange={setGold} />
      <Field label="Investments / Business Assets" value={investments} onChange={setInvestments} />
      <Field label="Debts / Liabilities Owed" value={liabilities} onChange={setLiabilities} />
      <Field label="Nisab Threshold (editable)" value={nisab} onChange={setNisab} />

      <View style={styles.resultCard}>
        <Row label="Total Wealth" value={totalWealth} />
        <Row label="Net Wealth (after debts)" value={netWealth} />
        <View style={styles.divider} />
        {isEligible ? (
          <>
            <Text style={styles.eligibleText}>You meet the Nisab threshold.</Text>
            <Row label="Zakat Due (2.5%)" value={zakatDue} highlight />
          </>
        ) : (
          <Text style={styles.notEligibleText}>
            Your net wealth is below Nisab — Zakat is not obligatory this year.
          </Text>
        )}
      </View>

      <Text style={styles.disclaimer}>
        This is an estimate for guidance only. For precise rulings (especially on business
        assets, jewelry-for-use exemptions, or mixed currencies), consult a qualified scholar.
      </Text>
    </ScrollView>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor="#6B7280"
      />
    </View>
  );
}

function Row({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, highlight && styles.rowValueHighlight]}>
        {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  note: { color: '#A0A0A0', fontSize: 13, lineHeight: 18, marginBottom: 20 },
  fieldWrapper: { marginBottom: 14 },
  fieldLabel: { color: '#FFFFFF', fontSize: 14, marginBottom: 6 },
  input: {
    backgroundColor: '#1B4332', color: '#FFFFFF', borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  resultCard: {
    backgroundColor: '#1B4332', borderRadius: 16, padding: 18, marginTop: 12,
    borderWidth: 1, borderColor: '#D4AF37',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowLabel: { color: '#A0A0A0', fontSize: 14 },
  rowValue: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  rowValueHighlight: { color: '#D4AF37', fontSize: 20, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: 'rgba(212, 175, 55, 0.2)', marginVertical: 8 },
  eligibleText: { color: '#4ADE80', fontSize: 13, marginBottom: 8 },
  notEligibleText: { color: '#A0A0A0', fontSize: 13 },
  disclaimer: { color: '#6B7280', fontSize: 11, marginTop: 20, lineHeight: 16 },
});
