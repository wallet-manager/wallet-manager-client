
import { loadConfig, Config, WalletManagerRequest, WalletManagerRequestCallback } from 'wallet-manager-client-utils';
const CONFIG = loadConfig<Config>('config');

import { ChainType, ChainId } from './entities/Enums';
import BigNumber from "bignumber.js";

import { WalletManagerClient } from './WalletManagerClient';
import { GetAddressReqeust } from './entities/GetAddressRequest';

const clientConfig = CONFIG.clientConfig;
const { privateKey } = CONFIG.identity;

const client = new WalletManagerClient(privateKey, clientConfig, (request:WalletManagerRequest)=>{
    console.info(`Request header ${JSON.stringify(request.header)}`);
    console.info(`Request data ${JSON.stringify(request.data)}`);
});

let seq = new Date().getTime()

async function getAddress(){
    const request: GetAddressReqeust = {
        merchant_id: new BigNumber('5'),
        chain_type: ChainType.ETH,
        chain_id: ChainId.Sepolia,
        client_id: "C" + seq++
    };
    
    client.getAddress(request).then(response=>{
        if(response.result && response.result.address){
            console.info("address " + response.result.address);
        }else{
            console.info("address " + JSON.stringify(response));
        }
        // console.info(JSON.stringify(response.result.address));
    }).catch(e => {
        console.error(e);
    });

    // setTimeout(() => {
    //     getAddress();
    // }, (10));
}

getAddress();
