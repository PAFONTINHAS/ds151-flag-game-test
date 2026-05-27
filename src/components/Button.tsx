import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, FlatList, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Item, ItemPlacar } from "../components/Item";

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

export const ButtonPlacar = () => {
  const router = useRouter();

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
        <Button title="Voltar" color="#007AFF" onPress={() => router.back()} />
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