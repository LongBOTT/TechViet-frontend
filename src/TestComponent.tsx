import React, { useState } from 'react';
import { filterVariantByPrice, searchVariantByProduct, searchVariantByProductsAndPrice } from './api/variantApi';
import { Variant } from './types/variant';
import { Product } from './types/product';

const TestComponent = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [minPrice, setMinPrice] = useState<number>(1000);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      weight: 1.5,
      description: 'Sản phẩm số 1',
      category: {
        id: 1, name: 'Category 1',
        status: ''
      },  // Thay thế bằng dữ liệu thực của category
      brand: {
        id: 1, name: 'Brand 1',
        status: ''
      },        // Thay thế bằng dữ liệu thực của brand
      warranty: { id: 1, name: 'Warranty 2', value: 24,unit: 'tháng',note:'' } // Thay thế bằng dữ liệu thực của warranty
    },
    {
      id: 2,
      name: 'Product 2',
      weight: 2.0,
      description: 'Sản phẩm số 2',
      category: { id: 1, name: 'Category 2',status:'' },  // Thay thế bằng dữ liệu thực của category
      brand: { id: 1, name: 'Brand 2',status:'' },        // Thay thế bằng dữ liệu thực của brand
      warranty: { id: 1, name: 'Warranty 2', value: 24,unit: 'tháng',note:'' } // Thay thế bằng dữ liệu thực của warranty
    }
  ];
  

  const handleSearch = async () => {
    try {
      // Gọi API tìm kiếm phiên bản theo mảng sản phẩm và khoảng giá
      const result = await searchVariantByProductsAndPrice(products, minPrice, maxPrice);
      if (result) {
        setVariants(result);
      } else {
        setVariants([]);
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm phiên bản:", error);
    }
  };

  return (
    <div>
      <h2>Tìm kiếm phiên bản sản phẩm</h2>

      <div>
        <label>Giá tối thiểu:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Giá tối đa:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <button onClick={handleSearch}>Tìm kiếm</button>

      <ul>
        {variants.map((variant, index) => (
          <li key={index}>
            {variant.id} - {variant.price} - {variant.productID}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestComponent;
