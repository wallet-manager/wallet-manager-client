import { ChainType, Direction, TransactionStatus, TransactionType } from "./Enums"


export interface TransferTransaction {
    merchant_id: string,
    chain_type: ChainType,
    chain_id: string,
    tx_hash: string,
    transfer_seq: number,
    block_hash: string,
    block_number: string,
    asset_name: string,
    trans_type: TransactionType,
    amount: string,
    is_fee: boolean,
    tx_status: boolean,
    trans_fee: string,
    trans_date: number,
    wallet_address: string,
    direction: Direction,
    from_address: string,
    to_address: string,
    confirmations: number,
    status: TransactionStatus
    wallet_settlement_date: number,
    creatd_date: number,
    post_balance: string
}