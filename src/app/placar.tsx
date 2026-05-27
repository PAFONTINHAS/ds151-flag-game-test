import { useFocusEffect, useRouter } from "expo-router";
import { use, useEffect, useState } from "react";
import { Button, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Item } from "../components/Item";
import { ButtonPlacar } from "../components/Button";
import { ScoreEntity } from "../services/domain/ScoreEntity";
import { DatabaseService } from "../services/DatabaseService";

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


async function loadStoredScores() : Promise<ScoreEntity[]>{

  const databaseService : DatabaseService = new DatabaseService();

  const data = databaseService.getScoreboard();

  return data;
}


export default function placar() {

  const [option, setOption] = useState<'NORMAL' | 'TEMPORIZADO'>('NORMAL');
  const[loading, setLoading] = useState(true);
  
  const [scoreboard, setScoreboard] =  useState<ScoreEntity[]>([]);

  useEffect(()=>{

    if(!loading) return;
    
    const fetchScoreboard = async () =>{
      const data = await loadStoredScores();

      setScoreboard(data);

      setLoading(false);
    };

    fetchScoreboard();

  });

  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ScoreEntity }) => {
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

        <View style={styles.menu}>
          <Button title="Normal" onPress={() => {}}></Button>
          <Button title="Temporizado" onPress={() => {}}></Button>
        </View>
        
        
        <FlatList
          data={scoreboard}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          ListEmptyComponent={
            <Text>Placar vazio</Text>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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
