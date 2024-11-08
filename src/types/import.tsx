export interface stockReceiveRequest{
    id: number;
    receive_date: string;
    total: number;
    note: string;
    supplierId: number;
}

export interface stockReceiveDetailRequest{
    id: number;
    stockReceiveId: number;
    variantId: number;
    quantity: number;
    price: number;
}

export interface imeiRequest{
    id: number;
    imei_code: string;
    receiveDetailId: number;
    status: string;
}

