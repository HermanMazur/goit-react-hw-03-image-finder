import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import LoadMore from './Button/Button';
import LoaderSpiner from './Loader/Loader';
import toast from 'react-hot-toast';
import api from 'services/api';
import { mapper } from 'helpers/mapper';

export default class App extends React.Component {
  state = {
    pictureName: '',
    pictureData: '',
    pictureModal: '',
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevState, prevProps) {
    const prevSearch = prevProps.pictureName;
    const nextSearch = this.state.pictureName;
    const prevPage = prevProps.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.loadPicture();
      this.resetData();
    }
    if (nextPage > prevPage) {
      this.loadPicture();
    }
  }

  loadPicture = () => {
    const { pictureName, page } = this.state;
    this.setState({ status: 'pending' });
    api
      .fetchPicture(pictureName, page)
      .then(res => {
        this.setState(prevState => ({
          pictureData: [...prevState.pictureData, ...mapper(res.data.hits)],
          status: 'resolved',
        }));
        if (res.data.hits.length === 0) {
          toast.error('There is no picture for that name');
        }
      })
      .catch(error => console.log(error));
  };

  handleFormSubmit = pictureName => {
    this.resetPage();

    this.setState({ pictureName });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  pictureModalClick = picture => {
    this.setState({
      pictureModal: picture,
    });
  };

  closeModal = () => {
    this.setState({
      pictureModal: '',
    });
  };

  resetPage() {
    this.setState({
      page: 1,
    });
  }

  resetData() {
    this.setState({
      pictureData: '',
    });
  }

  render() {
    const { status, pictureData, pictureModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />        
        {pictureData.length > 0 && (
          <ImageGallery
            pictureData={pictureData}
            onClick={this.pictureModalClick}
          ></ImageGallery>
        )}
        {status === 'pending' && <LoaderSpiner />}
        {pictureData.length > 0 && <LoadMore onClick={this.loadMore} />}
        {pictureModal.length > 0 && (
          <Modal onClose={this.closeModal}>
            <img src={pictureModal} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
