import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { map, split } from "lodash";
import { Container } from "inversify";
import getContainer from "../ioc/inversify.config";
import { Services } from '../dto/Services';
import { IPokemonService } from "./services/IPokemonService";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const ids: number[] = map(split(req?.query?.id ?? '', ','), Number) ?? [];
    const type: string = req.query.type ?? '';

    if (!ids.length || !type.length) {
        context.res = {
            status: 400,
            body: "Please provide a list of Pokémon IDs and a type."
        };
        return;
    }

    try {
        const container: Container = getContainer();
        const pokemonService: IPokemonService = container.get<IPokemonService>(Services.POKEMON_SERVICE);
        const pokemonNames: string[] = await pokemonService.getPokemonNamesByIdsAndType(ids, type);

        context.res = {
            status: 200,
            body: { pokemons: pokemonNames }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "An error occurred while processing your request."
        };
    }
};

export default httpTrigger;
