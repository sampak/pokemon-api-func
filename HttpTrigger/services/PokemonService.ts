import {map, filter, some} from 'lodash';
import axios, { AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { Pokemon } from '../../dto/IPokemon';
import { IPokemonType } from '../../dto/IPokemonType';
import { IPokemonService } from './IPokemonService';


@injectable()
export class PokemonService implements IPokemonService {
    async getPokemonById(id: number): Promise<Pokemon> {
        const response: AxiosResponse<Pokemon> = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return response.data;
    }

    async getPokemonNamesByIdsAndType(ids: number[], type: string): Promise<string[]> {
        const promises: Promise<Pokemon>[] = ids.map((id: number): Promise<Pokemon> => this.getPokemonById(id));
        const pokemons: Pokemon[] = await Promise.all(promises);
        
        const filteredPokemons: Pokemon[] = filter(pokemons, (pokemon: Pokemon): boolean =>
                some(pokemon.types, (t: IPokemonType): boolean => t.type.name === type)
        );
        const pokemonNames: string[] = map(filteredPokemons, (pokemon: Pokemon): string => pokemon.name);

        return pokemonNames;
    }
}
