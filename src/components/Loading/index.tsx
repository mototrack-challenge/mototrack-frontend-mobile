import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { styles } from "./styles";

type Props = {
  tamanho?: number;
  cor?: string;
};

const Loading: React.FC<Props> = ({ tamanho = 50, cor = "#547A6E" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={tamanho} color={cor} />
    </View>
  );
};

export default Loading;