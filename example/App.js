/**
 * Sample React Native Progress App
 * https://github.com/wufengyc/react-native-progress
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { CircularProgress } from '../';

const App: () => React$Node = () => {
  return (
    <ScrollView style={styles.scrollView}>
        <CircularProgress
            width={150}
            progress={80}
            strokeWidth={{ background: 8, foreground: 8 }}
            strokeColor={{ background: '#EAEAEA', foreground: ['#DAAB74', '#DAED74'] }}
            progressIndicator="circle"
            fill="#FFFFFF"
        >
            <Text style={{ fontSize: 28, color: '#1B1B1F', position: 'absolute' }}>36<Text style={{ color: '#AAAAAA', fontSize: 13 }}>/48</Text></Text>
        </CircularProgress>
        <CircularProgress
            width={150}
            progress={80}
            strokeWidth={{ background: 8, foreground: 8 }}
            strokeColor={{ background: '#FFFFFF', foreground: ['orange'] }}
            fill="black"
        />
        <CircularProgress
            width={200}
            progress={270 / 360 * 100}
            progressIndicator="circle"
            strokeColor={{ background: '#F7F7F9', foreground: ['#FF8F2C', '#F84238'] }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.bonusText} >400</Text>
                <Text style={styles.bondusDesc}>累计奖金(元)</Text>
            </View>
        </CircularProgress>
        <CircularProgress
            width={200}
            progress={270 / 360 * 100}
            backgroundProgress={80}
            progressIndicator="circle"
            strokeWidth={{ background: 20, foreground: 10 }}
            indicatorRadius={3}
            strokeColor={{ background: 'skyblue', foreground: ['#FFFFFF', '#000000'] }}>
        </CircularProgress>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default App;
