import { useParams } from "react-router-dom";

const GalleryItem = () => {
  const { id } = useParams();

  return <div>Render the image with id: {id}</div>;
};

export default GalleryItem;