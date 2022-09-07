import { CONFIG } from 'wallet-manager-client-utils';
import { ChainType, ChainId} from '../src/entities/Enums';
import BigNumber from "bignumber.js";

import {WalletManagerClient} from '../src/WalletManagerClient';
import { GetAddressReqeust } from '../src/entities/GetAddressRequest';
import { BatchWithdrawRequest, WithdrawOrder} from '../src/entities/BatchWithdrawRequest';
import { BatchWithdrawResult } from '../src/entities/BatchWithdrawResult';
import { BatchSweepRequest } from '../src/entities/BatchSweepRequest';
import { GetDepositByAddressRequest } from '../src/entities/GetDepositByAddressRequest';
import { GetDepositByHashRequest } from '../src/entities/GetDepositByHashRequest';
import { GetWithdrawByOrderIdRequest } from '../src/entities/GetWithdrawByOrderIdRequest';
import { GetWithdrawByBatchIdRequest } from '../src/entities/GetWithdrawByBatchIdRequest';

import { expect } from 'chai';

const clientConfig = CONFIG.clientConfig;
const { privateKey } = CONFIG.identity;

let orderSeq = new Date().getTime();


const client = new WalletManagerClient(privateKey, clientConfig);

describe("Test Access API", async function () {

    it("Get Address", async function () {

        // for(let i = 0; i < 100 ; i++) {
            const request:GetAddressReqeust = {
                merchant_id: new BigNumber('3'),
                chain_type: ChainType.ETH,
                chain_id: ChainId.Rinkeby,
                client_id: new Date().getTime().toFixed()
            };
    
            const response = await client.getAddress(request);
            console.info(JSON.stringify(response));
    
            expect(response.result).to.be.not.undefined;
            expect(response.result).to.be.not.null;
            expect(response.result?.address).to.be.not.undefined;
            expect(response.result?.address).is.an("string");
        // }

    });

    it("Batch withdraw", async function () {        

        const order1:WithdrawOrder = {
            merchant_order_id: "W" + orderSeq++,
            amount: new BigNumber("100000000000000000"),
            decimals: 18,
            to_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F2"
        };

        const order2:WithdrawOrder = {
            merchant_order_id: "W" + orderSeq++,
            amount: new BigNumber("200000000000000000"),
            decimals: 18,
            to_address: "0xA0365E4087335b3365a233598bCE4E166E4622fB" // to a client wallet address
        };

        const request:BatchWithdrawRequest = {
            merchant_id:new BigNumber(3),
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "UNI",
            orders: [order1, order2],
            client_data: "abc"
        };

        const response = await client.batchWithdraw(request);
        //{"error":null,"result":{"batch_id":63,"request_time":1661528769}}
        console.info(JSON.stringify(response));

        expect(response.result).to.be.not.undefined;
        expect(response.result).to.be.not.null;
        expect(response.result?.batch_id).to.be.not.undefined;
        expect(response.result?.request_time).to.be.not.undefined;

    });
    it("Batch withdraw 001", async function () {        

        const order:WithdrawOrder = {
            merchant_order_id: "W" + orderSeq++,
            amount: new BigNumber("10000000"),
            decimals: 6,
            to_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F2"
        };

        const request:BatchWithdrawRequest = {
            merchant_id:new BigNumber(3),
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "USDC",
            orders: [order],
            client_data: "cf_test001"
        };

        const response = await client.batchWithdraw(request);
        //{"error":null,"result":{"batch_id":63,"request_time":1661528769}}
        console.info(JSON.stringify(response));

        expect(response.result).to.be.not.undefined;
        expect(response.result).to.be.not.null;
        expect(response.result?.batch_id).to.be.not.undefined;
        expect(response.result?.request_time).to.be.not.undefined;

    });
    it("Batch withdraw 002(negative value)", async function () {        

        const order:WithdrawOrder = {
            merchant_order_id: "W" + orderSeq++,
            amount: new BigNumber("-0.1"),
            decimals: 6,
            to_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F2"
        };

        const request:BatchWithdrawRequest = {
            merchant_id:new BigNumber(3),
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "USDC",
            orders: [order],
            client_data: "cf_test002"
        };

        const response = await client.batchWithdraw(request);
        //{"error":null,"result":{"batch_id":63,"request_time":1661528769}}
        console.info(JSON.stringify(response));

        expect(response.result).to.be.null;
        expect(response.error).to.be.not.undefined;
        expect(response.error).to.be.not.null;

    });

    it("Preview batch sweep", async function () {        

        const request:BatchSweepRequest = {
            merchant_id: new BigNumber(3),
            merchant_order_id: 'S' + orderSeq++,
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "UNI",
            threshold: new BigNumber(1400000000),
            decimals: 18,
            gether_address: "0xcc1cf534F0F29C2CA6BB920C4D6473A7cbb06aDF",
            invoker_address: "0xfee2FFF9c65336EdBd61F6882f7dC9FAc2e782e5",
            client_data: "abc",
            preview: true
        };

        const response = await client.batchSweep(request);

        console.info(JSON.stringify(response));
    });

    it("Batch sweep", async function () {        

        const request:BatchSweepRequest = {
            merchant_id: new BigNumber(3),
            merchant_order_id: 'S' + orderSeq++,
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "UNI",
            threshold: new BigNumber(1400000000),
            decimals: 18,
            gether_address: "0xcc1cf534F0F29C2CA6BB920C4D6473A7cbb06aDF",
            invoker_address: "0xfee2FFF9c65336EdBd61F6882f7dC9FAc2e782e5",
            client_data: "abc",
            preview: false
        };

        const response = await client.batchSweep(request);

        console.info(JSON.stringify(response));
    });

    it("Batch sweep 001", async function () {        

        const request:BatchSweepRequest = {
            merchant_id: new BigNumber(3),
            merchant_order_id: 'S' + orderSeq++,
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "ETH",
            threshold: new BigNumber(30000000),
            decimals: 18,
            gether_address: "0xf8f4374652Df888B30A1D4D44547ba2A7AA754D3",
            invoker_address: "0xf8f4374652Df888B30A1D4D44547ba2A7AA754D2",
            client_data: "cf_test BatchSweep 001",
            preview: false
        };

        const response = await client.batchSweep(request);

        console.info(JSON.stringify(response));
    });

    it("getDepositByAddress", async function(){

        const request:GetDepositByAddressRequest = {
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            address: "0xaa2a674256017f7B71f8f7dF36041C5187D7B68E",
            asset_name: "UNI",
            offset: 0,
            limit: 10
        };
        const response = await client.getDepositByAddress(request);

        console.info(JSON.stringify(response));

    });

    it("getDepositByHash", async function(){
        const request:GetDepositByHashRequest = {
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            tx_hash: "0x1976e40062b6024d52667a6c88508a2ec0716ab50107ebfc26095beb4e8e4851",
            offset: 0,
            limit: 10
        };
        const response = await client.getDepositByHash(request);

        console.info(JSON.stringify(response));
    });

    it("getWithdrawByOrderId", async function(){
        const request:GetWithdrawByOrderIdRequest = {
            merchant_order_id: "W1662104213630",
            offset: 0,
            limit: 10
        };
        const response = await client.getWithdrawByOrderId(request);

        console.info(JSON.stringify(response));
    });

    it("getWithdrawByBatchId", async function(){
        const request:GetWithdrawByBatchIdRequest = {
            batch_id: "168",
            offset: 0,
            limit: 10
        };
        const response = await client.getWithdrawByBatchId(request);

        console.info(JSON.stringify(response, null, 2));
    });
    
});