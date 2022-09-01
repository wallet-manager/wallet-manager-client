import { WalletManagerUtils} from 'wallet-manager-client-utils';
import { Response} from 'wallet-manager-client-utils/dist/src/entities/Response';
import { ClientConfig } from 'wallet-manager-client-utils/dist/src/entities/Config'

import { GetDepositByAddressRequest } from './entities/GetDepositByAddressRequest';
import { GetDepositByAddressResult } from './entities/GetDepositByAddressResult';

import { GetDepositByHashRequest } from './entities/GetDepositByHashRequest';
import { GetDepositByHashResult } from './entities/GetDepositByHashResult';

import { GetWithdrawByOrderIdRequest } from './entities/GetWithdrawByOrderIdRequest';
import { Operation } from './entities/Operation';

import { GetWithdrawByBatchIdRequest } from './entities/GetWithdrawByBatchIdRequest';
import { OperationBatch } from './entities/OperationBatch';

import { GetAddressReqeust } from "./entities/GetAddressRequest";
import { GetAddressResult } from './entities/GetAddressResult';

import { BatchWithdrawRequest} from "./entities/BatchWithdrawRequest";
import { BatchWithdrawResult } from './entities/BatchWithdrawResult';

import { BatchSweepRequest } from './entities/BatchSweepRequest';
import { BatchSweepResult } from './entities/BatchSweepResult';

import { AxiosInstance } from 'axios';

export class WalletManagerClient{

    readonly instance:AxiosInstance;
    readonly utils:WalletManagerUtils;

    constructor(privateKey:string, clientConfig:ClientConfig){
        this.utils = new WalletManagerUtils(privateKey, clientConfig.instanceId);
        this.instance = this.utils.createAxiosInstance(clientConfig.baseURL, clientConfig.contentTypeJson);
    }

    async getAddress(request:GetAddressReqeust):Promise<Response<GetAddressResult>>{
        const response = await this.instance.post("/get_address", request);
        return response.data;
    }

    async batchWithdraw(request:BatchWithdrawRequest):Promise<Response<BatchWithdrawResult>>{
        const response = await this.instance.post("/batch_withdraw", request);
        return response.data;
    }

    async batchSweep(request:BatchSweepRequest):Promise<Response<BatchSweepResult>>{
        const response = await this.instance.post("/batch_sweep", request);
        return response.data;
    }

    async getDepositByAddress(request:GetDepositByAddressRequest):Promise<Response<GetDepositByAddressResult>>{
        const {chain_type, chain_id, address, asset_name, offset, limit} = request;        
        const response = await this.instance.get(
                `/${chain_type}/${chain_id}/transfer/addr/${address}/deposit/${asset_name}`, {
                    params: {
                        limit: limit,
                        offset: offset,
                    }
                }
            );
        return response.data;
    }

    async getDepositByHash(request:GetDepositByHashRequest):Promise<Response<GetDepositByHashResult>>{
        const {chain_type, chain_id, tx_hash, limit, offset} = request;
        const response = await this.instance.get(
                `/${chain_type}/${chain_id}/transfer/hash/${tx_hash}/deposit`, {
                    params: {
                        limit: limit,
                        offset: offset,
                    }
                }
            );
        return response.data;
    }

    async getWithdrawByOrderId(request:GetWithdrawByOrderIdRequest):Promise<Response<Operation>>{
        const response = await this.instance.get(`/withdraw/order/${request.merchant_order_id}`);
        return response.data;
    }


    async getWithdrawByBatchId(request:GetWithdrawByBatchIdRequest):Promise<Response<OperationBatch>>{
        const response = await this.instance.get(`/withdraw/batch/${request.batch_id}`);
        return response.data;
    }
}