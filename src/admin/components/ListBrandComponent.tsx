
import React, { useState, useEffect } from "react";
import { listBrands } from "../../services/BrandService";

// Định nghĩa interface cho dữ liệu brand
interface Brand {
  id: number;
  name: string;
}

const ListBrandComponent = () => {

  // Sử dụng useState với kiểu dữ liệu rõ ràng
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    listBrands()
      .then((response) => {
        setBrands(response.data);  // response.data phải là mảng các đối tượng kiểu Brand
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    
    <div>
      <h1>Hi</h1>
      <h2>List Brand </h2>
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>
                <td>{brand.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ListBrandComponent;
