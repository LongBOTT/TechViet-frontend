import { IconButton } from '@mui/material';
import { ArrowBackIosNew} from '@mui/icons-material';

const PreviousButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    onClick={onClick}
    sx={{
      // position: 'absolute',
      // top: '50%',
      // left: '0%  ',
      // marginTop: '60px',
      // transform: 'translateY(-50%)',
      backgroundColor: 'white',
      color: '#000',
      '&:hover': {
        backgroundColor: '#bdbdbd',
      },
    }}
  >
    <ArrowBackIosNew/>
  </IconButton>
);

export default PreviousButton;
