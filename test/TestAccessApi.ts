import { CONFIG } from 'wallet-manager-client-utils';
import { ChainType, ChainId} from '../src/entities/Enums';
import BigNumber from "bignumber.js";

import {WalletManagerClient} from '../src/WalletManagerClient';
import { GetAddressReqeust } from '../src/entities/GetAddressRequest';
import { BatchWithdrawRequest, WithdrawOrder} from '../src/entities/BatchWithdrawRequest';
import { BatchSweepRequest } from '../src/entities/BatchSweepRequest';

import { expect } from 'chai';

const clientConfig = CONFIG.clientConfig;
const { privateKey } = CONFIG.identity;


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
        expect(response.result?.address).is.an("string");

    });

    it("Batch withdraw", async function () {        

        const order:WithdrawOrder = {
            merchant_order_id: "E" + new Date().getTime().toFixed(),
            amount: new BigNumber("1000000"),
            decimals: 6,
            to_address: "0x8F9092CE573e41d72378Cf8c9d3335584e6843F1",
            client_data: {"abc":1}
        };

        const request:BatchWithdrawRequest = {
            merchant_id:new BigNumber(2),
            chain_type: ChainType.ETH,
            chain_id: ChainId.Rinkeby,
            asset_name: "USDT",
            orders: [order]
        };

        const response = await client.batchWithdraw(request);

        console.info(JSON.stringify(response));
    });

    
    
});