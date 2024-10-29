
import { Box } from '@mui/material';
import React, { FC, ReactElement } from 'react'
import { useParams } from 'react-router-dom';

interface ComparePageProps {

}

const ComparePage: FC<ComparePageProps> = (): ReactElement => {
    const params = useParams<{ params: string }>();  // `{ id: string }` đảm bảo `id` là chuỗi
    console.log(params)
    return (
    <Box>

    </Box>
  )
};

export default ComparePage;
