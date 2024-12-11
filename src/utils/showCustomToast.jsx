// toastUtils.js
import { toast } from 'react-toastify';

export const showCustomToast = (message, type) => {
  const pictype = {
    success: 'https://i.imgur.com/FPd5YgU.png',
    error: 'https://i.imgur.com/doQJm6m.png',
    wrong : 'https://i.imgur.com/3brjfLX.png',
  }

  toast(
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src= {pictype[type]}
        alt="icon" 
        style={{ width: '55px', height: '50px', marginRight: '8px' }}
      />
      <span
      className="text-xl"
      >{message}</span>
    </div>, 
    {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: '#fff',
        color: '#333', // Dark text color
        border: '1px solid #ddd', // Neutral border color
        borderRadius: '8px',
      },
    }
  );
};
