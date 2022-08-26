import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";

export interface BatchSweepRequest {
    merchant_id: BigNumber;
    merchant_order_id: string;
    chain_type: ChainType
    chain_id: BigNumber
    asset_name: string
    threshold: string
    decimals: number
    gether_address: string
    invoker_address: string
    client_data: unknown;
    preview: boolean;
}