const convertToDOMText = text => {
  if (!text) return '';
  let newText = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') newText += '&nbsp;';
    else if (text[i] === '\n') newText += '<br/>';
    else newText += text[i];
  }
  return newText;
}

export default convertToDOMText;