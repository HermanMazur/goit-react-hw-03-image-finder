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
    IsLoadingMore: false,
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
          IsLoadingMore:
            prevState.pictureData.length + res.data.hits.length ===
            res.data.totalHits
              ? false
              : true,
        }));
        if (res.data.hits.length === 0) {
          toast.error('There is no picture for that name');
        }
      })
      .catch(error => console.log(error));
  };

  handleFormSubmit = pictureName => {
    // перезапись на новые 12 картинок при вводе новой строки валидной
    this.resetPage();
    this.setState({ pictureName });
  };

  // функция загрузки новых 12 картинок
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

  // 1-МОДАЛКА)метод для закрытия модалки-пик
  closeModal = () => {
    this.setState({
      pictureModal: '',
    });
  };

  // скидываем страницу на 1 при новой валидной строки
  resetPage() {
    this.setState({
      page: 1,
    });
  }

  // скидываем инпут поиска на 0
  resetData() {
    this.setState({
      pictureData: '',
      IsLoadingMore: false,
    });
  }

  render() {
    const { status, pictureData, pictureModal, IsLoadingMore } = this.state;
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
        {IsLoadingMore && <LoadMore onClick={this.loadMore} />}
        {pictureModal.length > 0 && (
          <Modal onClose={this.closeModal}>
            {/* 2-МОДАЛКА) кинули метод закрытия в пропс в модалку-пик */}
            <img src={pictureModal} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}