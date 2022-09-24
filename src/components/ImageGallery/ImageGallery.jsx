import PropTypes from 'prop-types';
import { List } from "./ImageGallery.styled";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictureData, onClick }) => (
  <List>{pictureData.map(({ id, largeImageURL, webformatURL }) => (<ImageGalleryItem
    key={id}
    largeImageURL={largeImageURL}
    webformatURL={webformatURL}
    onClick={onClick} />))}</List>
);

export default ImageGallery;

ImageGallery.propTypes = {
  pictureData: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};