import React from 'react';

import { picsumResize } from '../../utils';
import "./index.css";

const IMAGE_DIMENSIONS = {
  x: 300,
  y: 200
};

const ImageCard = ({ data }) => {
  const thumbnailSrc = picsumResize({
    url: data.download_url,
    x: IMAGE_DIMENSIONS.x,
    y: IMAGE_DIMENSIONS.y
  });
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