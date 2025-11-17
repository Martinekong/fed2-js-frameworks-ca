import toast, { ToastOptions } from 'react-hot-toast';

const baseStyles: ToastOptions = {
  duration: 2500,
  style: {
    borderRadius: '8px',
    padding: '12px 16px',
    fontWeight: '400',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  },
};

export function successToast(message: string) {
  toast.success(message, {
    ...baseStyles,
    style: {
      ...baseStyles.style,
      background: '#C6F6BA',
      color: '#063C14',
    },
    iconTheme: {
      primary: '#063C14',
      secondary: '#C6F6BA',
    },
  });
}

export function errorToast(message: string) {
  toast.error(message, {
    ...baseStyles,
    style: {
      ...baseStyles.style,
      background: '#FECACA',
      color: '#7F1D1D',
    },
    iconTheme: {
      primary: '#7F1D1D',
      secondary: '#FECACA',
    },
  });
}
