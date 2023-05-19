import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";

export interface WithdrawOrder{
    
    merchant_order_id: string;
    amount: string;
    decimals: number;
    to_address: string;
}

export interface BatchWithdrawRequest{

    merchant_id:BigNumber;
    chain_type: ChainType;
    chain_id: BigNumber;
    asset_name: string;
    hot_wallet_address?:string
    orders:WithdrawOrder[];
    client_data?: string;

}