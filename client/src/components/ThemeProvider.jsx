/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div 
      className='
      bg-light-100 
      dark:bg-dark-100 
      text-light-800 
      dark:text-dark-400  
      min-h-screen  '>
        {children}
      </div>
    </div>
  );
}