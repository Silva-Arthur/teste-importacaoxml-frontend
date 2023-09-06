import { Compra } from "./Compra";
import { Geracao } from "./Geracao";
import { PrecoMedio } from "./PrecoMedio";

export class Regiao {
    sigla: string;
    geracao: Geracao = new Geracao();
    compra: Compra = new Compra();
    precoMedio: PrecoMedio = new PrecoMedio();
}