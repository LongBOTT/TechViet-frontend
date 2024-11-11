//src/types/warranty.ts
export interface Warranty {
  id: number;       // ID bảo hành, khóa chính
  name: string;     // Tên chính sách bảo hành
  value: number;    // Thời gian bảo hành
  unit: string;     // Đơn vị thời gian bảo hành (ví dụ: tháng, năm)
  note: string;     // Ghi chú, với độ dài tối đa 4096 ký tự
}

export interface WarrantyNote {

  
}