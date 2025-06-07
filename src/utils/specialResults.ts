
export const checkSpecialResult = (result: number): boolean => {
  const resultStr = result.toString();
  
  // Check for milestone numbers
  const milestones = [100, 500, 1000, 5000, 10000];
  if (milestones.includes(result)) return true;
  
  // Check for palindromes
  const isPalindrome = resultStr === resultStr.split('').reverse().join('');
  if (isPalindrome && resultStr.length > 1) return true;
  
  // Check for repeating digits (like 111, 222, etc.)
  const hasRepeatingDigits = /^(\d)\1+$/.test(resultStr);
  if (hasRepeatingDigits && resultStr.length > 1) return true;
  
  // Check for perfect squares
  const sqrt = Math.sqrt(result);
  if (Number.isInteger(sqrt) && result > 1) return true;
  
  return false;
};

export const getSpecialResultMessage = (result: number): string => {
  const resultStr = result.toString();
  
  if ([100, 500, 1000, 5000, 10000].includes(result)) {
    return `Wow! You hit ${result}! 🎯`;
  }
  
  if (resultStr === resultStr.split('').reverse().join('') && resultStr.length > 1) {
    return `Nice palindrome: ${result}! 🪞`;
  }
  
  if (/^(\d)\1+$/.test(resultStr) && resultStr.length > 1) {
    return `Cool repeating digits: ${result}! 🔄`;
  }
  
  const sqrt = Math.sqrt(result);
  if (Number.isInteger(sqrt) && result > 1) {
    return `Perfect square: ${sqrt}² = ${result}! 📐`;
  }
  
  return '';
};
