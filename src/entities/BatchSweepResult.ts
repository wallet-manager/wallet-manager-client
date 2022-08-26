import BigNumber from "bignumber.js";

export interface SweepRecord {
    wallet_version: number;
    path: string;
    from_address: string;
    to_address: string;
    amount: BigNumber;
    decimals: number;
}

export interface BatchSweepResult {

    batch_id: string|number
    sweep_records: SweepRecord[]
    request_time: number

}