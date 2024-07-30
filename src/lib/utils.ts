
export function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    // El API de Clipboard no está soportado en este navegador, utiliza el método anterior.
    fallbackCopyToClipboard(text);
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch(err => {
      console.error('Error al copiar al portapapeles: ', err);
    });
}

// Función de respaldo para navegadores que no soportan el API de Clipboard
function fallbackCopyToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Error al copiar al portapapeles: ', err);
  }

  document.body.removeChild(textArea);
}

export function hideMiddleCharacters(inputString: string, count: number): string {
  if (inputString.length <= count * 2) {
    // If the length of the string is less than or equal to double the specified count, there are no characters to hide
    return inputString;
  }

  const visibleLength = inputString.length - count * 2;
  const hiddenPart = '***';

  return inputString.slice(0, visibleLength / 2) + hiddenPart + inputString.slice(-visibleLength / 2);
}

export function checkPositiveInteger(str: string, min?: number, max?: number, defaultValue: string = '1'): string {
  // Try to convert the string to an integer
  const num = parseInt(str, 10);

  // Check if the conversion is valid, if the number is greater than zero,
  // and if it is within the optional min and max range
  if (!isNaN(num) && num > 0 && Number.isInteger(num)) {
    if ((min !== undefined && num < min) || (max !== undefined && num > max)) {
      return defaultValue;
    }
    return str;
  }
  return defaultValue;
}

export function validateNumbers(e: any): any {
  const key = e.which || e.keyCode;
  const inputType = e.inputType || '';

  const isNumeric = key >= 48 && key <= 57; // Numeric characters from the main keyboard
  const isNumericKeypad = key >= 96 && key <= 105; // Numeric characters from the numeric keypad (numpad)
  const isBackspace = key === 8;
  const isDecimalPoint = key === 190 || key === 110; // Key code for the dot (.) in the main or numeric keyboard
  const isDelete = key === 46; // Key code for the Delete key
  const isArrowLeft = key === 37; // Key code for the left arrow key
  const isArrowRight = key === 39; // Key code for the right arrow key
  const isCtrlOrCmd = e.ctrlKey || e.metaKey; // Ctrl or Command key
  const isCtrlV = isCtrlOrCmd && key === 86; // Ctrl+V for paste

  // Allow Ctrl+V for paste, and basic navigation keys
  if (isCtrlV || isArrowLeft || isArrowRight || isBackspace || isDelete) {
    return true;
  }

  // Mobile input types (covers basic numeric input)
  if (inputType === 'insertText' || inputType === 'insertFromPaste') {
    const insertedText = e.data || '';
    const sanitizedText = sanitizeInput(insertedText);
    if (sanitizedText !== insertedText) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  if (!isNumeric && !isNumericKeypad && !isDecimalPoint) {
    e.preventDefault(); // Prevent default behavior of the pressed key
    return false; // Indicate that the input is invalid
  }

  return true; // Indicate that the input is valid
}

export function sanitizeInput(input: string) {
  // Remove leading zeros from numbers
  input = input.replace(/^0+(\d+)/, '$1');

  // Ensure the input starts with '0.' if it starts with a dot
  input = input.replace(/^\./, '0.');

  // Allow only one dot in the input
  input = input.replace(/(\..*)\./g, '$1');

  // Remove any non-numeric character except for dot
  input = input.replace(/[^0-9.]/g, '');

  return input;
}

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // Si el numero total de páginas es 7 o menos
  //vamos a mostrar todas las páginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({length: totalPages}, (_, i) => i + 1)
  }
  //si la página actual esta enre las primeras 3 paginas
  //mostrar las primeras 3 ,puntos suspensivos, y las ultimas 2
  if(currentPage <=3){
    return [1,2,3,'...', totalPages - 1, totalPages]
  }

  //si la página actual esta entre las últimas 3 páginas
  //mostrar las primeras 2 ,puntos suspensivos, las ultimas 3 paginas
  if(currentPage >= totalPages - 2){
    return [1,2,'...', totalPages - 2, totalPages - 1, totalPages]
  }
  // si la pagina actual esta en otro lugar medio
  //mostrar la primera pagina, puntos suspensivos, pagina actual y vecinos
  return [
    1,'...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages
  ]
}
