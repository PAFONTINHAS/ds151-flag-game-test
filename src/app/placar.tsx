import {
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";

export default function placar() {
  const navigation = useNavigation();

  const router = useRouter();

  console.log("teste");

  type ItemPlacar = {
    id: string;
    title: string;
  };

  const DATA: ItemPlacar[] = [
    {
      id: "1",
      title: "Normal",
    },
    {
      id: "2",
      title: "Temporizado",
    },
  ];

  type ItemProps = {
    item: ItemPlacar;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  };

  const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const ButtonPlacar = () => {
    const [selectedId, setSelectedId] = useState<string>();

    const renderItem = ({ item }: { item: ItemPlacar }) => {
      const backgroundColor = item.id === selectedId ? "#000080" : "#007AFF";
      const color = item.id === selectedId ? "white" : "black";
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={backgroundColor}
          textColor={color}
        />
      );
    };

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Button
            title="Voltar"
            color="#007AFF"
            onPress={() => router.back()}
          />
          <Text style={styles.text}>Placar</Text>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      width: "80%",
    },
    item: {
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 20,
      marginHorizontal: 8,
      height: 50,
      justifyContent: "center",
      elevation: 3,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
    },
    text: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
    },
  });
}
