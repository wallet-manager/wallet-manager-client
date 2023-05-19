import { OperationBatchStatus, OperationType } from "./Enums";

export interface Operation {

    merchant_id: string;
    batch_id: string;
    operation_seq: number;
    merchant_order_id: string;
    wallet_version: number;
    path: string;
    from_address: string;
    to_addresss: string;
    invoker_address: string;
    operation_type: OperationType;
    amount: string;
    asset_name: string;
    status: OperationBatchStatus;
    create_date: number;
    last_modified_date: number;
    decimals: number;
    transactions?: OperationTransaction[]
}