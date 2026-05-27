import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { ScoreEntity } from "../services/domain/ScoreEntity";

export type ItemPlacar = {
    id: string;
    title: string;
};

type ItemProps = {
    item: ScoreEntity;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};
export const Item = ({ item, onPress}: ItemProps) => {
    return(
        <TouchableOpacity
            onPress={onPress}
            style={[styles.item]}
        >
            <Text style={[styles.title]}>Nome: {item.name} - Pontos: {item.score}</Text>
            <hr/>
        </TouchableOpacity>
    )
}

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
