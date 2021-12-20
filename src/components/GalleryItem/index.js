import { useContext } from "react";
import { useParams } from "react-router-dom";

import { GalleryContext } from "../../contexts/gallery";
import { picsumResize, fitImageToDefinedWidth } from "../../utils";

import './index.css';

const GalleryItem = () => {
  const { id } = useParams();
  const { state } = useContext(GalleryContext);
  const {
    width,
    height,
    download_url,
    author,
    url
  } = state.images.find(el => el.id === id);

  const processedImageUrl = picsumResize({
    url: download_url,
    ...fitImageToDefinedWidth({
      maxWidth: 1110,
      width,
      height
    })
  });

  return (
    <div className="gallery-item">
      <div className="gallery-item__body">
        <img 
          src={processedImageUrl} 
          alt={author} 
          loading="lazy"
          className="gallery-item__image"
        />
      </div>
      <div className="gallery-item__footer">
        <dl className="gallery-item__details">
          {width && (
            <>
              <dt>width:</dt>
              <dd>{width}</dd>
            </>
          )}
          {height && (
            <>
              <dt>height:</dt>
              <dd>{height}</dd>
            </>
          )}
          {url && (
            <>
              <dt>url:</dt>
              <dd><a href={url}>{url}</a></dd>
            </>
          )}
          {download_url && (
            <>
              <dt>download_url:</dt>
              <dd><a href={download_url}>{download_url}</a></dd>
            </>
          )}
        </dl>
      </div>
    </div>
  );
};

export default GalleryItem;