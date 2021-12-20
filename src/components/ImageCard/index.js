import React from 'react';

import "./index.css";

const IMAGE_DIMENSIONS = {
  x: 300,
  y: 200
};

const ImageCard = ({ data }) => {
  const thumbnailSrc = data.download_url.replace(
    /\d+\/\d+$/, 
    `${IMAGE_DIMENSIONS.x}/${IMAGE_DIMENSIONS.y}`
  );
  return (
    <figure className={`image-card ${data.isSelected ? 'is-selected' : 'is-not-selected'}`}>
      <img 
        src={thumbnailSrc} 
        alt={data.author} 
        loading='lazy'
        className="image-card__thumbnail"  
      />
      <figcaption className="image-card__caption">{data.author}</figcaption>
    </figure>
  )
};

export default ImageCard;