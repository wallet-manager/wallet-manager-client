import BigNumber from "bignumber.js";
import { ChainType, WalletType } from "./Enums";

export interface EnquiryWalletTypeBalanceResult {
    id: BigNumber
    merchant_id: BigNumber
    wallet_type: WalletType
    chain_type: ChainType
    chain_id: BigNumber
    asset_name: string
    balance: string
    last_settled_trans_id: BigNumber
    created_date: string
    last_modified_date: string
    decimals: number
}