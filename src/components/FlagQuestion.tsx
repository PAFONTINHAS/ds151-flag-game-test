import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

interface FlagQuestionProps {
  username: string;
  countryCode: string;
}

export const FlagQuestion = ({ username, countryCode }: FlagQuestionProps) => {
  return (
    <View style={styles.flagContainer}>
      <Text style={styles.question}>{username},</Text>
      <Text style={styles.question}>selecione a qual país a bandeira abaixo pertence?</Text>
      <Image
        style={styles.flag}
        source={{
          uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`
        }}
        contentMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flagContainer: {
    flex: 4,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  flag: {
    width: 180,
    height: 180,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
});
