import {inject, injectable} from "inversify";
import {COMMON_TYPES} from "../../ioc/commonTypes";
import {ILogger} from "../../commonServices/ILogger";
import {IFunctionService} from "./IFunctionService";

@injectable()
export class FunctionService implements IFunctionService<any> {

    @inject(COMMON_TYPES.ILogger)
    private readonly _logger: ILogger;

    public processMessageAsync(msg: string): {msg: string} {
        this._logger.info("Hello world");
        this._logger.verbose(`${JSON.stringify(msg)}`);
        return {msg: "success"};
    }
}
