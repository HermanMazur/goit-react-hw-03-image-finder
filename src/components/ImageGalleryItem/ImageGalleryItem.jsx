import PropTypes from 'prop-types';
import { ItemImageGallery, Image } from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ id, largeImageURL, webformatURL, onClick }) => {
  return (
    <ItemImageGallery
      key={id}
      onClick={() => onClick(largeImageURL)}
    >
      <Image
        src={webformatURL}
        alt=""
      />
    </ItemImageGallery>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    id: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,    
    onClick: PropTypes.func.isRequired,
};