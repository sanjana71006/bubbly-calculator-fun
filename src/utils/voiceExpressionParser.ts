
export const parseVoiceExpression = (transcript: string): string => {
  let expression = transcript.toLowerCase().trim();
  
  // Remove common phrases
  expression = expression
    .replace(/what is|what's|calculate|compute|tell me|how much is/gi, '')
    .replace(/equals?|equal to/gi, '')
    .trim();

  // Convert spoken numbers to digits
  const numberWords: { [key: string]: string } = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
    'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
    'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
    'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'thirty': '30',
    'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
    'eighty': '80', 'ninety': '90', 'hundred': '100', 'thousand': '1000'
  };

  // Replace number words with digits
  Object.keys(numberWords).forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    expression = expression.replace(regex, numberWords[word]);
  });

  // Convert operations to symbols
  expression = expression
    .replace(/\bplus\b|\badd\b|\band\b/gi, '+')
    .replace(/\bminus\b|\bsubtract\b|\btake away\b/gi, '-')
    .replace(/\btimes\b|\bmultiplied by\b|\bmultiply\b/gi, '*')
    .replace(/\bdivided by\b|\bdivide\b|\bover\b/gi, '/')
    .replace(/\bto the power of\b|\bpower\b|\braised to\b/gi, '^')
    .replace(/\bsquared\b/gi, '^2')
    .replace(/\bcubed\b/gi, '^3');

  // Clean up extra spaces
  expression = expression.replace(/\s+/g, ' ').trim();
  
  // Remove spaces around operators for cleaner expression
  expression = expression.replace(/\s*([+\-*/^])\s*/g, '$1');

  return expression;
};

export const isValidMathExpression = (expression: string): boolean => {
  // Basic validation for math expression
  const mathPattern = /^[\d+\-*/^().\s]+$/;
  return mathPattern.test(expression) && expression.length > 0;
};
