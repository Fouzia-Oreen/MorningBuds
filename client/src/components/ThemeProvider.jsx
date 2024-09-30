/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='bg-[#b0cffa] dark:bg-[#191d24] text-[#18222cc4] dark:text-[#6f7580]  min-h-screen  '>
        {children}
      </div>
    </div>
  );
}