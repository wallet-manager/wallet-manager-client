import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";

export interface GetDepositByAddressRequest {
    
    chain_type: ChainType;
    chain_id: BigNumber;
    address: string;
    asset_name: string;
    offset: number;
    limit: number;

}