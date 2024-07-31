'use client';

export const alterredUserAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9DBm4up7xkDQKhfO1kvAAwU8Grk36ZywnngllVU&s'

export const truncateText = (text, maxLength, ellipsis = '...') => {
    if (typeof text !== 'string' || typeof maxLength !== 'number') {
      console.error(
        'Invalid arguments for truncateText: text must be a string and maxLength must be a number.'
      );
      return text;
    }
  
    if (text.length <= maxLength) return text;
  
    const charsToShow = maxLength - ellipsis.length;
    return text.substring(0, charsToShow) + ellipsis;
  };