import 'reflect-metadata';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PokemonService } from '../HttpTrigger/services/PokemonService';
import { IPokemonService } from '../HttpTrigger/services/IPokemonService';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
describe('PokemonService', () => {
    let service: IPokemonService;
    let mock: MockAdapter;

    beforeAll((): void => {
        service = new PokemonService();
        mock = new MockAdapter(axios);
    });

    afterEach((): void => {
        mock.reset();
    });

    it('should return the correct Pokémon names by IDs and type', async (): Promise<void> => {
        const ids: number[] = [1, 2, 3];
        const type: string = 'grass';

        mock.onGet('https://pokeapi.co/api/v2/pokemon/1').reply(200, {
            name: 'bulbasaur',
            types: [{ type: { name: 'grass' } }]
        });
        mock.onGet('https://pokeapi.co/api/v2/pokemon/2').reply(200, {
            name: 'ivysaur',
            types: [{ type: { name: 'grass' } }]
        });
        mock.onGet('https://pokeapi.co/api/v2/pokemon/3').reply(200, {
            name: 'venusaur',
            types: [{ type: { name: 'grass' } }]
        });

        const result: string[] = await service.getPokemonNamesByIdsAndType(ids, type);
        expect(result).toEqual(['bulbasaur', 'ivysaur', 'venusaur']);
    });

    it('should return an empty array if no Pokémon match the type', async (): Promise<void> => {
        const ids: number[] = [1, 2, 3];
        const type: string = 'fire';

        mock.onGet('https://pokeapi.co/api/v2/pokemon/1').reply(200, {
            name: 'bulbasaur',
            types: [{ type: { name: 'grass' } }]
        });
        mock.onGet('https://pokeapi.co/api/v2/pokemon/2').reply(200, {
            name: 'ivysaur',
            types: [{ type: { name: 'grass' } }]
        });
        mock.onGet('https://pokeapi.co/api/v2/pokemon/3').reply(200, {
            name: 'venusaur',
            types: [{ type: { name: 'grass' } }]
        });

        const result: string[] = await service.getPokemonNamesByIdsAndType(ids, type);
        expect(result).toEqual([]);
    });
});
