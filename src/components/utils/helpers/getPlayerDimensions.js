'use client'

const getPlayerDimensions = (screenSize) => {
    switch (screenSize) {
      case 'xs':
        return { width: '100%', height: 'auto' };
      case 'sm':
        return { width: '300px', height: '180px' };
      case 'md':
        return { width: '330px', height: '200px' };
      case 'lg':
        return { width: '330px', height: '200px' };
      case 'xl':
        return { width: '355px', height: '200px' };
      case 'xxl':
        return { width: '415px', height: '200px' };
      default:
        return { width: '360px', height: '200px' };
    }
  };
  
  export default getPlayerDimensions;
  