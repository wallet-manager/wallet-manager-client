import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";
import { WalletType } from "./Enums";

export interface EnquiryWalletTypeBalanceRequest{

    chain_type?: ChainType;
    chain_id?: BigNumber;
    asset_names?: string[];
    wallet_types?: WalletType[];

}