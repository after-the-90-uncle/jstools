/**
 * 16进制色值转rgba
 */
export function hexToRgba(hex:string) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(function (char) {
      return char.repeat(2);
    }).join('');
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  let a = 1;
  if(hex.length === 8){
    a = parseInt(hex.slice(6, 2), 16) / 255;
  }
  return `rgba(${r},${g},${b},${a})`;
}