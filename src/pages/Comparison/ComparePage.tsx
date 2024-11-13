
import { Box, Paper } from '@mui/material';
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Product } from '../../types/product';
import { Variant } from '../../types/variant';
import { Variant_Attribute } from '../../types/variant_attribute';
import { searchVariantBy_Id } from '../../api/variantApi';
import SpecificationsTable from '../Product/SpecificationsTable';
import CompareSpecificationsTable from './CompareSpecificationsTable';

interface Product_Variant {
  product: Product;
  variants: Variant[];
  variants_attributes: Variant_Attribute[];
}
interface ComparePageProps {

}

const ComparePage: FC<ComparePageProps> = (): ReactElement => {
    const params = useParams<{ params: string }>();  // `{ id: string }` đảm bảo `id` là chuỗi
    const variantIDList = params.params?.replace(":", "").split("&&")
    const [variants, setVariants] = useState<Variant[]>([]);
    console.log(variantIDList)

    useEffect(() => {
      const loadVariants = async () => {
        try {
          let variantList: Variant[] = [];
          for (const id of variantIDList ?? []) {
            const variant = await searchVariantBy_Id(Number(id));
            if (variant) {
              variantList.push(variant);
            }
          }
          setVariants(variantList);
        } catch (error) {
          console.error("Error loading products:", error);
        }
      };
      loadVariants();
    }, []);

    return (
      <Box>
        <CompareSpecificationsTable variants={variants} />
      </Box>
    );
};

export default ComparePage;
