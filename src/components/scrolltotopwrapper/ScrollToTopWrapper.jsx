import React from 'react';
import ScrollToTopButton from '../scrolltotopbutton/ScrollToTopButton';


const ScrollToTopWrapper = ({ children }) => {
  return (
    <div>
      {children}
      <ScrollToTopButton />
    </div>);
};

export default ScrollToTopWrapper;
