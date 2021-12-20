export const picsumResize = ({url, x, y}) => url.replace(/\d+\/\d+$/, `${x}/${y}`);

export const fitImageToDefinedWidth = ({
    maxWidth,
    width,
    height
  }) => {
    let coefficient = width / maxWidth;
  
    if (coefficient > 1) {
      return {
        x: Math.round(width / coefficient),
        y: Math.round(height / coefficient)
      };
    }
  
    return {
      x: width,
      y: height
    }
  };