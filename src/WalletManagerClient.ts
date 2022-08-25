import { WalletManagerUtils} from 'wallet-manager-client-utils';
import { Response} from 'wallet-manager-client-utils/dist/src/entities/Response';
import { ClientConfig } from 'wallet-manager-client-utils/dist/src/entities/Config'

import { GetAddressReqeust } from "./entities/GetAddressRequest";

import { AxiosInstance } from 'axios';

export class WalletManagerClient{

    instance:AxiosInstance;

    constructor(privateKey:string, clientConfig:ClientConfig){
        const utils = new WalletManagerUtils(privateKey, clientConfig.instanceId);
        this.instance = utils.createAxiosInstance(clientConfig.baseURL, clientConfig.contentTypeJson);
    }

    async getAddress(request:GetAddressReqeust):Promise<Response>{
        // const r = snakecaseKeys(request);
        const response = await this.instance.post("/get_address", request);
        return response.data;
    }

}