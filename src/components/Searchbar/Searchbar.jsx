import React from "react";
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import { SearchbarHeader, SearchForm,SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled";

export default class SearchBar extends React.Component {

  static propTypes = { onSubmit: PropTypes.func.isRequired };
  
  state = {
    pictureName: '',
  };

  handleSearchChange = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.pictureName.trim() === '') {
      return toast.error('Enter a search query');
    }
    this.props.onSubmit(this.state.pictureName);
  };

  render() {
    return (
      <SearchbarHeader>
        <Toaster />
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            value={this.state.pictureName}
            onChange={this.handleSearchChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}