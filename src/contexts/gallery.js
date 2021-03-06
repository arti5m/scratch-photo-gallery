
import { createContext, useReducer, useEffect } from 'react';

const IMAGE_GALLERY_ENDPOINT = 'https://picsum.photos/v2/list';

const INITIAL_GALLERY_STATE = {
  loading: true,
  images: [],
  error: '',
  selectedTotal: 0
};

export const GALLERY_ACTIONS = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  UPDATE_SELECTED: 'UPDATE_SELECTED'
};

const setSelectedImages = ({state, action}) => {
  let newState = { ...state };
  const selectedTotal = newState.selectedTotal;
  let selectedIndex;
  let selectedImage = newState.images.find((el, index ) => {
    if (el.id === action.payload.id) {
      selectedIndex = index;
    }
    return el.id === action.payload.id;
  });

  selectedImage = {
    ...selectedImage,
    isSelected: !selectedImage.isSelected
  };

  newState.images[selectedIndex] = selectedImage;

  newState = {
    ...newState,
    selectedTotal: selectedImage.isSelected ? 
      selectedTotal + 1 : 
      selectedTotal - 1
  };

  return newState;
};


const galleryReducer = (state, action) => {
  switch (action.type) {
    case GALLERY_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...action.payload].map(item => (
          {
            ...item,
            isSelected: false // initialize isSelected
          }
        )),
        selectedTotal: 0
      };
    case GALLERY_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        images: [],
        error: 'There was a problem loading images...'
      };
    case GALLERY_ACTIONS.UPDATE_SELECTED:
      const newState = setSelectedImages({state, action});
      return newState;
    default: 
      return state;
  }
};

export const GalleryContext = createContext();

export const GalleryProvider = (props) => {
  const [state, dispatch] =  useReducer(galleryReducer, INITIAL_GALLERY_STATE);
  
  useEffect(() => {
    fetch(IMAGE_GALLERY_ENDPOINT)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({
            type: GALLERY_ACTIONS.FETCH_SUCCESS,
            payload: result
          });
        },
        (error) => {
          dispatch({
            type: GALLERY_ACTIONS.FETCH_ERROR
          });
        }
      );
  }, []);

  return (
    <GalleryContext.Provider value={{state,dispatch}}>
      {props.children}
    </GalleryContext.Provider>
  );
};