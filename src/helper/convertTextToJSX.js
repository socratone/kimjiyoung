import React from 'react';

const convertTextToJSX = text => {
  if (!text) return null;

  let spaceConverted = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') spaceConverted += '\u00A0';
    else spaceConverted += text[i];
  }
  const oneLineTexts = spaceConverted.split('\n');
  
  let texts = [];
  for (let i = 0; i < oneLineTexts.length - 1; i++) {
    texts.push(oneLineTexts[i]);
    texts.push(<br />);
  }
  texts.push(oneLineTexts[oneLineTexts.length - 1]);

  return texts;
};

export default convertTextToJSX;