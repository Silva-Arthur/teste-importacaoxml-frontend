import { Compra } from './../models/Compra';
import { Geracao } from './../models/Geracao';
import { Regiao } from './../models/Regiao';
import { Agente } from './../models/Agente';
import { PrecoMedio } from '../models/PrecoMedio';
export class ConversorService {

    /**
     * 
     * @param document 
     * 
     * Define qual conversor para remoção do precoMedio será utilizado, e retorna um JSON
     * 
     * @returns JSON
     */
    converter(document: any): any {

        var sizeArray = 0;
        for (var [key, agentes] of Object.entries(document)) {
            for (var [key, agente] of Object.entries(agentes)) {
                if (key == 'agente') {
                    sizeArray = Object.values(agente).length
                }
            }
        }
        return (sizeArray > 3) ? this.converterObj(document) : this.converterObjSimples(document);
    }

    /**
     * 
     * @param document 
     * 
     * Processa uma arquivo XML enviado, removendo o precoMedio, por questões que regra de negócio, e retorna um JSON
     * 
     * @returns JSON
     */
    converterObj(document: any): any {
        var agenteAux: Agente;
        var regiaoAux: Regiao;
        var geracaoAux: Geracao;
        var compraAux: Compra;
        var listAuxAgentes: Array<Agente>;
        listAuxAgentes = new Array();

        for (var [key, value12] of Object.entries(document)) {
            for (var [key1, value] of Object.entries(value12)) {
                for (var [key, agentes] of Object.entries(value)) {
                    agenteAux = new Agente();
                    for (var [key, agente] of Object.entries(agentes)) {

                        if (key == 'codigo')
                            agenteAux.codigo = agente;

                        if (key == 'data')
                            agenteAux.data = agente;

                        if (key == 'regiao') {
                            for (var [key, regioes] of Object.entries(agente)) {

                                regiaoAux = new Regiao();
                                for (var [key, regiao] of Object.entries(regioes)) {

                                    if (key == '_sigla') {
                                        regiaoAux.sigla = regiao.toString();
                                    }

                                    if (key == 'geracao') {
                                        geracaoAux = new Geracao();
                                        for (var [key, geracao] of Object.entries(regiao)) {
                                            geracao.toString().split(',').forEach((valor) => {
                                                geracaoAux.valor.push(valor);
                                            });
                                        }
                                        regiaoAux.geracao = geracaoAux;
                                    }

                                    if (key == 'compra') {
                                        compraAux = new Compra()
                                        for (var [key, compra] of Object.entries(regiao)) {
                                            compra.toString().split(',').forEach((valor) => {
                                                compraAux.valor.push(valor);
                                            });
                                        }
                                        regiaoAux.compra = compraAux;
                                    }

                                    if (key == 'precoMedio') {
                                        regiaoAux.precoMedio = new PrecoMedio();
                                    }
                                }
                                agenteAux.regiao.push(regiaoAux);
                            }
                        }
                    }
                    listAuxAgentes.push(agenteAux);
                }
            }
        }
        return listAuxAgentes;
    }

    /**
     * 
     * @param document 
     * 
     * Processa uma arquivo XML enviado, contendo um único registro, removendo o precoMedio, por questões que regra de negócio, e retorna um JSON
     * 
     * @returns JSON
     */
    converterObjSimples(document: any): any {
        var agenteAux: Agente;
        var regiaoAux: Regiao;
        var geracaoAux: Geracao;
        var compraAux: Compra;
        var listAuxAgentes: Array<Agente>;
        listAuxAgentes = new Array();

        for (var [key, value] of Object.entries(document)) {
            for (var [key, agentes] of Object.entries(value)) {
                agenteAux = new Agente();
                for (var [key, agente] of Object.entries(agentes)) {

                    if (key == 'codigo')
                        agenteAux.codigo = agente;

                    if (key == 'data')
                        agenteAux.data = agente;

                    if (key == 'regiao') {
                        for (var [key, regioes] of Object.entries(agente)) {

                            regiaoAux = new Regiao();
                            for (var [key, regiao] of Object.entries(regioes)) {

                                if (key == '_sigla')
                                    regiaoAux.sigla = regiao.toString();

                                if (key == 'geracao') {
                                    geracaoAux = new Geracao();
                                    for (var [key, geracao] of Object.entries(regiao)) {
                                        geracao.toString().split(',').forEach((valor) => {
                                            geracaoAux.valor.push(valor);
                                        });
                                    }
                                    regiaoAux.geracao = geracaoAux;
                                }

                                if (key == 'compra') {
                                    compraAux = new Compra()
                                    for (var [key, compra] of Object.entries(regiao)) {
                                        compra.toString().split(',').forEach((valor) => {
                                            compraAux.valor.push(valor);
                                        });
                                    }
                                    regiaoAux.compra = compraAux;
                                }

                                if (key == 'precoMedio') {
                                    regiaoAux.precoMedio = new PrecoMedio();
                                }
                            }
                            agenteAux.regiao.push(regiaoAux);
                        }
                    }
                }
                listAuxAgentes.push(agenteAux);
            }
        }
        return listAuxAgentes;
    }
}