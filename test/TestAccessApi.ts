import { CONFIG } from 'wallet-manager-client-utils';
import { ChainType, ChainId} from '../src/entities/Enums';
import BigNumber from "bignumber.js";

import {WalletManagerClient} from '../src/WalletManagerClient';
import { GetAddressReqeust } from '../src/entities/GetAddressRequest';
import { BatchWithdrawRequest, WithdrawOrder} from '../src/entities/BatchWithdrawRequest';
import { BatchWithdrawResult } from '../src/entities/BatchWithdrawResult';
import { BatchSweepRequest } from '../src/entities/BatchSweepRequest';

import { expect } from 'chai';

const clientConfig = CONFIG.clientConfig;
const { privateKey } = CONFIG.identity;

let orderSeq = new Date().getTime();


const client = new WalletManagerClient(privateKey, clientConfig);

describe("Test Access API", async function () {

    it("Get Address", async function () {
        
        const request:GetAddressReqeust = {
            merchant_id: new BigNumber('1'),
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            client_id: '2' //new Date().getTime().toFixed()
        };

        const response = await client.getAddress(request);
        console.info(JSON.stringify(response));

        expect(response.result).to.be.not.undefined;
        expect(response.result).to.be.not.null;
        expect(response.result?.address).to.be.not.undefined;
        expect(response.result?.address).is.an("string");

    });

    it("Batch withdraw", async function () {        

        const order:WithdrawOrder = {
            merchant_order_id: "W" + orderSeq++,
            amount: new BigNumber("1000000"),
            decimals: 6,
            to_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F2"
        };

        const request:BatchWithdrawRequest = {
            merchant_id:new BigNumber(2),
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "USDT",
            orders: [order],
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

    it("Preview batch sweep", async function () {        

        const request:BatchSweepRequest = {
            merchant_id: new BigNumber(2),
            merchant_order_id: 'S' + orderSeq++,
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "USDT",
            threshold: new BigNumber(1000000),
            decimals: 6,
            gether_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F1",
            invoker_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F2",
            client_data: "abc",
            preview: true
        };

        const response = await client.batchSweep(request);

        console.info(JSON.stringify(response));
    });

    it("Batch sweep", async function () {        

        const request:BatchSweepRequest = {
            merchant_id: new BigNumber(2),
            merchant_order_id: 'S' + orderSeq++,
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "USDT",
            threshold: new BigNumber(1000000),
            decimals: 6,
            gether_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F1",
            invoker_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F2",
            client_data: "abc",
            preview: false
        };

        const response = await client.batchSweep(request);

        console.info(JSON.stringify(response));
    });

    
    
});