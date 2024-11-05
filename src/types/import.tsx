export interface importRequest{
    id: number;
    date: string;
    total: number;
    importNote: string;
    supplierId: number;
}

export interface importDetailRequest{
    id: number;
    importId: number;
    variantId: number;
    quantity: number;
    price: number;
}

export interface serialRequest{
    id: number;
    serial: string;
    importDetailId: number;
}

