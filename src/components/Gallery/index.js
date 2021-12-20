import React, {useEffect, useContext, useCallback, useState} from "react";
import { NavLink } from "react-router-dom";

import "./index.css";

import { GalleryContext, GALLERY_ACTIONS } from "../../contexts/gallery";

import ImageCard from '../ImageCard';

function Gallery() {
  const { state, dispatch } = useContext(GalleryContext);
  const [ filteredImages, setFilteredImages ] = useState([]);
  const toggleSelected = useCallback(
    (index) => {
      dispatch({
        type: GALLERY_ACTIONS.UPDATE_SELECTED,
        payload: index
      });
    },
    [dispatch]
  );

  const filterResults = useCallback(
    (e) => {
      const value = e.target.value;
      const filteredImages = state.images.filter(item => {
        const pattern = new RegExp(value.toLowerCase(), 'gi');
        return pattern.test(item.author);
      });

      if (value.length > 2) {
        setFilteredImages(filteredImages);
      } else {
        setFilteredImages([]);
      }
    },
    [ state, setFilteredImages ]
  );

  if (state.error) {
    return (
      <div className="nav">
        <output>There was a problem loading images...</output>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="nav">
        <output>Images loading...</output>
      </div>
    );
  }

  return (
    <nav className="image-gallery__wrapper">
      <div className="image-gallery__header">
        <div className="image-gallery__search">
          <label for="gallery-search">Search by Author: </label>
          <input 
            id="gallery-search" 
            onChange={filterResults} 
            placeholder="Search"
          />
        </div>
        <output>Selected Images: {state.selectedTotal}</output>
      </div>
      <ul className="image-gallery">
        {
          filteredImages.length > 0 ?
          (
            filteredImages.map((img) => (
              <li className="image-gallery__item" key={img.id}>
                <NavLink to={`/item/${img.id}`} onClick={() => toggleSelected(img)}>
                  <ImageCard data={img} />
                </NavLink>
              </li>
            ))
          ) :
          (
            state.images.map((img) => (
              <li className="image-gallery__item" key={img.id}>
                <NavLink to={`/item/${img.id}`} onClick={() => toggleSelected(img)}>
                  <ImageCard data={img} />
                </NavLink>
              </li>
            ))
          )
        } 
      </ul>
    </nav>
  );
}

export default Gallery;
