import { CONFIG } from 'wallet-manager-client-utils';
import BigNumber from "bignumber.js";

import {WalletManagerClient} from '../src/WalletManagerClient';
import { GetAddressReqeust } from '../src/entities/GetAddressRequest';
import { expect } from 'chai';

const clientConfig = CONFIG.clientConfig;
const { privateKey } = CONFIG.identity;


const client = new WalletManagerClient(privateKey, clientConfig);

describe("Test Access API", async function () {

    it("Get Address", async function () {
        
        const request:GetAddressReqeust = {
            merchant_id: new BigNumber('1001'),
            chain_type: 1,
            chain_id: new BigNumber('1'),
            client_id: new Date().getTime().toFixed()
        };

        const response = await client.getAddress(request);
        console.info(JSON.stringify(response));

        expect(response.result).to.be.not.undefined;
        expect(response.result).to.be.not.null;
        expect(response.result).is.an("string");

    });
});