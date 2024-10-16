import { ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const ForwardButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    onClick={onClick}
    sx={{
      // position: 'absolute',
      // top: '50%',
      // right: '10px',
      // marginTop: '60px',
      // transform: 'translateY(-50%)',
      backgroundColor: '#e0e0e0',
      color: '#000',
      '&:hover': {
        backgroundColor: '#bdbdbd',
      },
    }}
  >
    <ArrowForwardIos/>
  </IconButton>
);

export default ForwardButton;
