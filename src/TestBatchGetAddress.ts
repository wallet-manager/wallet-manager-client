
import { loadConfig, Config } from 'wallet-manager-client-utils';
const CONFIG = loadConfig<Config>('config');

import { ChainType, ChainId } from './entities/Enums';
import BigNumber from "bignumber.js";

import { WalletManagerClient } from './WalletManagerClient';
import { GetAddressReqeust } from './entities/GetAddressRequest';

const clientConfig = CONFIG.clientConfig;
const { privateKey } = CONFIG.identity;

const client = new WalletManagerClient(privateKey, clientConfig);

let seq = new Date().getTime()

async function getAddress(){
    const request: GetAddressReqeust = {
        merchant_id: new BigNumber('3'),
        chain_type: ChainType.ETH,
        chain_id: ChainId.Rinkeby,
        client_id: "C" + seq++
    };
    
    client.getAddress(request).then(response=>{
        console.info(JSON.stringify(response));
    });

    setTimeout(() => {
        getAddress();
    }, (10));
}

getAddress();
