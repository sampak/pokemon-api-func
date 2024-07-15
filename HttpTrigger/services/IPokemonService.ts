import { Pokemon } from "../../dto/IPokemon";

export interface IPokemonService {
  getPokemonById(id: number): Promise<Pokemon>
  getPokemonNamesByIdsAndType(ids: number[], type: string): Promise<string[]>
}
