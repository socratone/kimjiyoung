import React from 'react';

const convertTextToJSX = text => {
  if (!text) return null;

  let spaceConverted = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') spaceConverted += '\u00A0';
    else spaceConverted += text[i];
  }

  const texts = spaceConverted.split('\n');
  
  return texts.map((text, i) => <p key={i}>{text}</p>)
};

export default convertTextToJSX;