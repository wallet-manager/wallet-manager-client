import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";

export interface GetDepositByHashRequest {

    chain_type: ChainType;
    chain_id: BigNumber;
    tx_hash: string;
    
}