import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PreviousButton = () => (
  <IconButton
    // onClick={onClick}
    sx={{
      // position: 'absolute',
      // top: '50%',
      // left: '0%  ',
      marginTop: '60px',
      // transform: 'translateY(-50%)',
      backgroundColor: '#e0e0e0',
      color: '#000',
      '&:hover': {
        backgroundColor: '#bdbdbd',
      },
    }}
  >
    <ArrowBackIosIcon/>
  </IconButton>
);

export default PreviousButton;
