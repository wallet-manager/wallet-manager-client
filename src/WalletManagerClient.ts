import { WalletManagerUtils} from 'wallet-manager-client-utils';
import { Response} from 'wallet-manager-client-utils/dist/src/entities/Response';
import { ClientConfig } from 'wallet-manager-client-utils/dist/src/entities/Config'
import { GetDepositByAddressRequest } from './entities/GetDepositByAddressRequest';
import { GetDepositByHashRequest } from './entities/getDepositByHashRequest';
import { GetWithdrawByOrderIdRequest } from './entities/getWithdrawByOrderIdRequest';
import { GetWithdrawByBatchIdRequest } from './entities/getWithdrawByBatchIdRequest';

import { GetAddressResponse } from './entities/GetAddressResponse';

import { GetAddressReqeust } from "./entities/GetAddressRequest";


import { BatchWithdrawRequest} from "./entities/BatchWithdrawRequest";
import { BatchWithdrawResponse } from './entities/BatchWithdrawResponse';

import { BatchSweepRequest } from './entities/BatchSweepRequest';
import { BatchSweepResponse } from './entities/BatchSweepResponse';

import { AxiosInstance } from 'axios';

export class WalletManagerClient{

    instance:AxiosInstance;

    constructor(privateKey:string, clientConfig:ClientConfig){
        const utils = new WalletManagerUtils(privateKey, clientConfig.instanceId);
        this.instance = utils.createAxiosInstance(clientConfig.baseURL, clientConfig.contentTypeJson);
    }

    async getAddress(request:GetAddressReqeust):Promise<Response<GetAddressResponse>>{
        const response = await this.instance.post("/get_address", request);
        return response.data;
    }

    async batchWithdraw(request:BatchWithdrawRequest):Promise<Response<BatchWithdrawResponse>>{
        const response = await this.instance.post("/batch_withdraw", request);
        return response.data;
    }

    async batchSweep(request:BatchSweepRequest):Promise<Response<BatchSweepResponse>>{
        const response = await this.instance.post("/batch_sweep", request);
        return response.data;
    }

    async getDepositByAddress(request:GetDepositByAddressRequest):Promise<Response<unknown>>{
        const {chain_type, chain_id, address, asset_name} = request;
        const response = await this.instance.get(
                `/${chain_type}/${chain_id}/transfer/addr/${address}/deposit/${asset_name}`
            );
        return response.data;
    }

    async getDepositByHash(request:GetDepositByHashRequest):Promise<Response<unknown>>{
        const {chain_type, chain_id, tx_hash} = request;
        const response = await this.instance.get(
                `/${chain_type}/${chain_id}/transfer/hash/${tx_hash}/deposit`
            );
        return response.data;
    }

    async getWithdrawByOrderId(request:GetWithdrawByOrderIdRequest):Promise<Response<unknown>>{
        const response = await this.instance.get(`/withdraw/order/${request.merchant_order_id}`);
        return response.data;
    }


    async getWithdrawByBatchId(request:GetWithdrawByBatchIdRequest):Promise<Response<unknown>>{
        const response = await this.instance.get(`/withdraw/batch/${request.batch_id}`);
        return response.data;
    }
}