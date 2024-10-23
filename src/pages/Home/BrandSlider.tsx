import { Box, Grid, Typography } from '@mui/material';
import Slider from "react-slick";
import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Import file CSS
import { Brand } from '../../types/brand';

interface PropsType {
  brands: Brand[];
}

const BrandSlider: React.FC<PropsType> = ({ brands }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        rows: (brands.length>4)? 2:1,
        arrows: (brands.length>8)? true:false,
        
        // variableWidth: true
    };

    return (
        <Box sx={{ height: '100%',}}>
            <Slider {...settings}>
                {brands.map((brand, index) => (
                    <Link to={`/`} key={index} className='no-underline'>
                        <Grid item xs={21}>
                            <Box
                                sx={{
                                    width:'fit-content',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: '#ffffff',
                                    margin: '10px',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        boxShadow:'0 4px 10px rgba(0, 0, 0, 0.4)'
                                    },
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '70px',
                                        height: '70px',
                                        margin: '5px',
                                    }}
                                >
                                    <img
                                        src={"/src/assets/products/product1.png"}
                                        alt={brand.name}
                                        style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        width: '142px',
                                        margin: '5px',
                                    }}
                                >
                                    <Typography variant='body2' sx={{ fontWeight: 'lighter' }}>
                                        {brand.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Link>
                ))}
            </Slider>
        </Box>
    );
};

export default BrandSlider;
