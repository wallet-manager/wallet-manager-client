import { ChainType, OperationBatchStatus, OperationType } from "./Enums"
import { Operation } from "./Operation"


export interface OperationBatch{

    merchant_id: string,
    chain_type: ChainType,
    chain_id: string,
    operation_type: OperationType
    total_operation: number,
    total_step: number,
    current_step: number,
    status:OperationBatchStatus,
    create_date: number,
    last_modified_date: number,
    operations: Operation[]
    
}