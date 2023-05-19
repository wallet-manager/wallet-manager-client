import { loadConfig } from 'wallet-manager-client-utils';
import { MerchantConfig } from '../src/entities/MerchantConfig'
const CONFIG = loadConfig<MerchantConfig>('config');
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
import {EnquiryWalletTypeBalanceRequest}  from '../src/entities/EnquiryWalletTypeBalanceRequest';
import {EnquiryWalletTypeBalanceResult}  from '../src/entities/EnquiryWalletTypeBalanceResult';

import { expect } from 'chai';

const clientConfig = CONFIG.clientConfig;
const { privateKey } = CONFIG.identity;

let orderSeq = new Date().getTime();

const chain_type = ChainType.TRON;
const chain_id = ChainId.Default;
const merchant_id = new BigNumber(CONFIG.merchantId);

const client = new WalletManagerClient(privateKey, clientConfig, (request) => {
    console.info(JSON.stringify(request))
});

describe("Test Access API ETH", async function () {

    it("Get Address", async function () {

        const request:GetAddressReqeust = {
            chain_type, 
            chain_id, 
            merchant_id,
            client_id: new Date().getTime().toFixed()
        };

        const response = await client.getAddress(request);
        console.info(JSON.stringify(response));

        expect(response.result).to.be.not.undefined;
        expect(response.result).to.be.not.null;
        expect(response.result?.address).to.be.not.undefined;
        expect(response.result?.address).is.an("string");

    });

    it("Batch withdraw", async function () {        

        const order1:WithdrawOrder = {
            merchant_order_id: "W1234567890", //+ orderSeq++,
            amount: "2000000000000000000",
            decimals: 6,
            to_address: "TCM2FJiHQfYuRY4c2kcdcpRykYmRkJpLRQ"
        };

        // const order2:WithdrawOrder = {
        //     merchant_order_id: "W" + orderSeq++,
        //     amount: new BigNumber("300000000000000000"),
        //     decimals: 18,
        //     to_address: "0x2d1366C71e86F20De3eeCc3f00F270D78A8CEFe5" // to a client wallet address
        // };

        const request:BatchWithdrawRequest = {
            chain_type, 
            chain_id, 
            merchant_id,
            asset_name: "USDT",
            orders: [order1],
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
            amount: "1000000000000000000000",
            //amount: new BigNumber("1000000"),
            decimals: 6,
            to_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F2"
        };

        const request:BatchWithdrawRequest = {
            merchant_id:new BigNumber(CONFIG.merchantId),
            chain_type: ChainType.ETH,
            chain_id: ChainId.Sepolia,
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
            amount: "-0.1",
            decimals: 6,
            to_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F2"
        };

        const request:BatchWithdrawRequest = {
            chain_type, 
            chain_id, 
            merchant_id,
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
            chain_type,
            chain_id,
            asset_name: "UNI",
            threshold: new BigNumber("1400000000"),
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
            chain_type,
            chain_id,
            asset_name: "UNI",
            threshold: new BigNumber("1400000000"),
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
            chain_type,
            chain_id,
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
            chain_type,
            chain_id,
            address: "0xaF59Bf676e2b8e8D904D06c47a944A6124BF2C2E",
            asset_name: "WMT",
            offset: 0,
            limit: 10
        };
        const response = await client.getDepositByAddress(request);

        console.info(JSON.stringify(response));

    });

// "{""type"":""deposit_status"",""data"":{""id"":104,""merchant_id"":1,""chain_type"":1,""chain_id"":1,""client_id"":""525a1134205946a3348b0507cc3af213"",""trans_type"":1,""wallet_address"":""1LjAYqbJQRL1U1kPmo7MPHmMWPbaj1M3Qc"",""from_address"":""1Cxu9uvTkBFVmFN7vvT4dTCsBbrqod4QjP"",""asset_name"":""BTC"",""amount"":""10000"",""decimals"":8,""status"":2,""updated_time"":1664351487,""block_number"":""756030"",""block_hash"":""0000000000000000000534b74798cec3ed91ff62fa4049ae38ce3723d01cf262"",""block_time"":1664349920,""tx_hash"":""30e929ac8ae51a9f32805a774e9cc73b5f6bb3a662ef7d1c716d69327548ec51""}}"

    it("getDepositByHash", async function(){
        const request:GetDepositByHashRequest = {
            chain_type,
            chain_id,
            tx_hash: "30e929ac8ae51a9f32805a774e9cc73b5f6bb3a662ef7d1c716d69327548ec51",
            offset: 0,
            limit: 10
        };
        const response = await client.getDepositByHash(request);

        console.info(JSON.stringify(response));
    });

    it("getWithdrawByOrderId", async function(){
        const request:GetWithdrawByOrderIdRequest = {
            merchant_order_id: "EU11_WD_1682331270464",
            withFee: true
        };
        const response = await client.getWithdrawByOrderId(request);

        console.info(JSON.stringify(response, null, 2));
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

    it("enquryWalletTypeBalance", async function(){
        const request:EnquiryWalletTypeBalanceRequest = {
            wallet_types: [3],
            asset_names: ["OKT"]
        };
        const response = await client.enquiryWalletTypeBalance(request);

        // for(const r of response.result){
        //     console.info(JSON.stringify(r, null, 2));    
        // }

        console.info(JSON.stringify(response, null, 2));
    });
    
});