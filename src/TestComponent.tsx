import React, { useState } from 'react';
import { searchVariantByProduct } from './api/variantApi';
import { Variant } from './types/variant';

const TestComponent = () => {
  const [variants, setVariants] = useState<Variant[]>([]);

  const handleSearch = async () => {
    try {
      const productID = "1";
      const data = await searchVariantByProduct(productID);
      if (data) {
        setVariants(data);
      } else {
        console.error("No data received from API");
      }
      console.log("Kết quả phiên bản:", data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSearch}>Tìm phiên bản theo sản phẩm</button>
      <ul>
        {variants.map(variant => (
          <li key={variant.id}>{variant.id}</li> // Hiển thị danh sách phiên bản
        ))}
      </ul>
    </div>
  );
};

export default TestComponent;
