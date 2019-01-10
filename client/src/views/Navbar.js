import React, { Component } from 'react';
import Dropdown from '../components/Dropdown';
import '../css/NavBar.css';
import fetchPostings from '../actions/postingsActions';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      searchCategory: 'Select Category',
      searchKeywords: '',
    };
    this.searchCategories = ['Position', 'Location'];
  }

  updateSearchCategory = (newCategory) => {
    this.setState({
      searchCategory: newCategory,
    });
  };

  updateSearchKeywords = (event) => {
    this.setState({ searchKeywords: event.target.value });
  };

  _handlePositionSearch = () => {
    this.updateSearchCategory(this.searchCategories[0]);
  };

  _handleLocationSearch = () => {
    this.updateSearchCategory(this.searchCategories[1]);
  };

  _searchJobs = async() => {
    const response = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       'keywords': this.state.searchKeywords
      })
    });

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    console.log(body);
    return body;
  };

  handleKeyDown = function (e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      this.searchElement.click();
    }
  };

  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
          <a className="navbar-brand" href="#">Internado</a>

          <form className="form-inline my-2 my-lg-0" onKeyDown={(e) => {this.handleKeyDown(e)}}>
            <input className="form-control mr-sm-2"
              type="search"
              value={this.state.searchKeywords}
              placeholder="Search Companies"
              aria-label="Search"
              onChange={this.updateSearchKeywords}
            />
            <Dropdown
              searchCategory={this.state.searchCategory}
              handlePositionSearch={this._handlePositionSearch}
              handleLocationSearch={this._handleLocationSearch}
              positionCategory={this.searchCategories[0]}
              locationCategory={this.searchCategories[1]}
            />
            <div className="navbar-nav ml-auto">
              <a onClick={this.props.searchHandler(this.state.searchKeywords)} ref={search => this.searchElement = search}>
                <button type="button" className="btn btn-primary mr-2">Search</button>
              </a>
            </div>
          </form>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ml-auto">
              <button type="button" className="btn btn-primary mr-2">Sign up</button>
              <button type="button" className="btn btn-secondary">Login</button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
