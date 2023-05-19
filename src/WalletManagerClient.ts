import { WalletManagerUtils, WalletManagerRequestCallback} from 'wallet-manager-client-utils';
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

import { EnquiryWalletTypeBalanceRequest } from './entities/EnquiryWalletTypeBalanceRequest';
import { EnquiryWalletTypeBalanceResult } from './entities/EnquiryWalletTypeBalanceResult';


import { AxiosInstance } from 'axios';

export class WalletManagerClient{

    readonly instance:AxiosInstance;
    readonly utils:WalletManagerUtils;

    constructor(privateKey:string, clientConfig:ClientConfig, requestCallback:WalletManagerRequestCallback = ()=>{return}){
        this.utils = new WalletManagerUtils(privateKey, clientConfig.instanceId, requestCallback);
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
        const path = `/${chain_type}/${chain_id}/transfer/addr/${address}/deposit/${asset_name}`;
        const response = await this.instance.get(
                path, {
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
        const path = `/${chain_type}/${chain_id}/transfer/hash/${tx_hash}/deposit`;
        const response = await this.instance.get(
                path, {
                    params: {
                        limit: limit,
                        offset: offset,
                    }
                }
            );
        return response.data;
    }

    async getWithdrawByOrderId(request:GetWithdrawByOrderIdRequest):Promise<Response<Operation>>{
        const {merchant_order_id, withFee} = request;
        const path = `/withdraw/order/${merchant_order_id}`;
        const response = await this.instance.get(
            path, {
                params: {
                    withFee: withFee || false
                }
            });
        return response.data;
    }

    async getWithdrawByBatchId(request:GetWithdrawByBatchIdRequest):Promise<Response<OperationBatch>>{
        const {batch_id, limit, offset} = request;
        const path = `/withdraw/batch/${batch_id}`;
        const response = await this.instance.get(
            path, {
                params: {
                    limit: limit,
                    offset: offset,
                }
            });
        return response.data;
    }

    async enquiryWalletTypeBalance(request:EnquiryWalletTypeBalanceRequest):Promise<Response<EnquiryWalletTypeBalanceResult[]>>{
        const {chain_type, chain_id, asset_names, wallet_types} = request;
        const path = `/wallet_type_balance`;
        const response = await this.instance.get(
            path, {
                params: {
                    chain_type, 
                    chain_id, 
                    asset_names, 
                    wallet_types
                }
            });
        return response.data;
    }
    
}