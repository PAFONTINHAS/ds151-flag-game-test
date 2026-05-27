import { object } from "../../underscore-esm-min";
import { ScoreEntity } from "./domain/ScoreEntity";
import axios, {AxiosResponse} from 'axios';

const URL = "http://localhost:3000";
const SCORES_TABLE = `${URL}/scores`;
const TIMED_SCORES_TABLE = `${URL}/timedscores`;

export class DatabaseService {
    // funções pegas de: https://imasters.com.br/back-end/mockando-um-back-end-com-o-json-server

    public async storeNewScore(scoreEntity: ScoreEntity) {
        
        try{
            await axios.post(SCORES_TABLE, scoreEntity);

        }catch(e){
            console.error("Erro ao adicionar score: ", e);
        }
    }

    public async getScoreboard() : Promise<ScoreEntity[]>{

        console.log("[SERVICE] pegando scores da rota: ", SCORES_TABLE);
        
        try{
            const {data} = await axios.get(SCORES_TABLE);
            console.log("Scoreboard: ", data); 

            return data as ScoreEntity[];
        }catch(e){
            console.error("Erro ao pegar scoreboard: ", e);
            return [];
        }
    }
}
