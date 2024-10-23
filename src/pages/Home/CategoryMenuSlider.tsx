import { Box, Grid, Typography } from '@mui/material';
import Slider from "react-slick";
import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Import file CSS
import { CATEGORY } from '../../constants/routeConstants';
const categories = [
    {id:1, name: 'Điện thoại', imgSrc: 'src/assets/products/product1.png' },
    {id:2, name: 'Laptop', imgSrc: 'src/assets/products/product2.png' },
    {id:3, name: 'Máy tính bảng', imgSrc: 'src/assets/products/product3.jpg' },
    {id:4, name: 'Đồng hồ thông minh', imgSrc: 'src/assets/products/product4.png' },
    {id:5, name: 'Loa', imgSrc: 'src/assets/products/product5.jpg' },
    {id:6, name: 'Tai nghe', imgSrc: 'src/assets/products/product6.png' },
    {id:7, name: 'Sạc dự phòng', imgSrc: 'src/assets/products/product7.jpg' },
    {id:8, name: 'Cáp sạc', imgSrc: 'src/assets/products/product8.jpg' },
    {id:9, name: 'Ốp lưng điện thoại', imgSrc: 'src/assets/products/product9.jpg' },
    {id:10, name: 'Ốp lưng máy tính bảng', imgSrc: 'src/assets/products/product10.jpg' },
    {id:11, name: 'Chuột', imgSrc: 'src/assets/products/product11.jpg' },
    {id:12, name: 'Bàn phím', imgSrc: 'src/assets/products/product12.jpg' },
    {id:13, name: 'Tivi', imgSrc: 'src/assets/products/product13.png' },
    {id:14, name: 'Robot hút bụi', imgSrc: 'src/assets/products/product14.png' },
    {id:15, name: 'Màn hình', imgSrc: 'src/assets/products/product15.png' },
    {id:16, name: 'Linh kiện', imgSrc: 'src/assets/products/product16.png' },
    {id:17, name: 'PC lắp ráp', imgSrc: 'src/assets/products/product17.png' },
];

interface WatchSliderProps {
  sliderRef: React.RefObject<Slider>;
}


function removeVietnameseTones(str:string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Remove combining diacritical marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    // Remove extra spaces
    str = str.trim();
    // Remove punctuations
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replaceAll(" ", "-");
    return str;
}

const CategoryMenuSlider: React.FC<WatchSliderProps> = ({ sliderRef }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        rows: 2,
        arrows: false
    };

    return (
        <Box sx={{ background: '#f3f4f6', width: '100%', height: '100%' }}>
            <Slider ref={sliderRef} {...settings}>
                {categories.map((category, index) => (
                    // <Link to={`/${removeVietnameseTones(category.name)}`} key={index} className='no-underline'>
                    <Link to={`${CATEGORY}/:${category.id}`} key={index} className='no-underline'>
                        <Grid item xs={2}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: '#ffffff',
                                    margin: '10px',
                                    borderRadius: '10px',
                                    height: '100px',
                                    '&:hover img': {
                                        transform: 'scale(1.10)',
                                    },
                                    '&:hover': {
                                        cursor: 'pointer'
                                    },
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '90px',
                                        height: '100px',
                                        margin: '5px',
                                    }}
                                >
                                    <Typography variant='body2' sx={{ fontWeight: 'lighter' }}>
                                        {category.name}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '80px',
                                        height: '80px',
                                        margin: '5px',
                                    }}
                                >
                                    <img
                                        src={category.imgSrc}
                                        alt={category.name}
                                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Link>
                ))}
            </Slider>
        </Box>
    );
};

export default CategoryMenuSlider;
