import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";

export interface WithdrawOrder{
    
    merchant_order_id: string;
    amount: BigNumber;
    decimals: number;
    to_address: string;
    client_data: unknown;
 }

export interface BatchWithdrawRequest{

    merchant_id:BigNumber;
    chain_type: ChainType;
    chain_id: BigNumber;
    asset_name: string;
    orders:WithdrawOrder[];

}