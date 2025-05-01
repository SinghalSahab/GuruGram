import useTheme from '../../context/ThemeContext';
import {motion} from 'framer-motion';
import {Sun, Moon} from 'lucide-react';
function ThemeBtn()
{
    const {themeMode, darkTheme, lightTheme} = useTheme();
    function handleClick()
    {
        if(themeMode=='dark')
        {
            lightTheme();
        }
        else
        {
            darkTheme();
        }
    }
    
  const variants = {
    light: { rotate: 0 },
    dark: { rotate: 360 },
  };

    return ( <motion.button
        onClick={handleClick}
        className="p-2 rounded-full focus:outline-none duration-300 ease-in-out
                     dark:text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          variants={variants}
          animate={themeMode}
          transition={{ duration: 0.7 }}
        >
          {themeMode === 'dark' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </motion.div>
      </motion.button>
    );
};

export default ThemeBtn;