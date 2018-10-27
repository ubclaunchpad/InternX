import React, { Component } from 'react';
import '../../css/NavBar.css';

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      searchCategory: "Select Category",
      searchKeywords: ""
    };
    this.searchCategories = ["Position", "Location"];
    this.updateSearchCategory = this.updateSearchCategory.bind(this);
    this.updateSearchKeywords = this.updateSearchKeywords.bind(this);
  }

  updateSearchCategory(newCategory){
    this.setState({
      searchCategory: newCategory
    });
  }

  updateSearchKeywords(event) {
    this.setState({searchKeywords: event.target.value});
  }

  keyPress(e){
    // If enter is pressed
    if(e.keyCode == 13){
       this.searchJobs();
    }
  }

  searchJobs = async() => {
    const response = fetch('http://localhost:5000/search', {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
       "keywords": this.state.searchKeywords
      }
    });

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    console.log(body);
    return body;
  }

  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
          <a className="navbar-brand" href="#">Internado</a>

          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2"
                   type="search"
                   value={this.state.searchKeywords}
                   placeholder="Search Companies"
                   aria-label="Search"
                   onChange={this.updateSearchKeywords}
            />
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle category-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.searchCategory}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={() => {this.updateSearchCategory(this.searchCategories[0])}}>{this.searchCategories[0]}</a>
                <a className="dropdown-item" onClick={() => {this.updateSearchCategory(this.searchCategories[1])}} >{this.searchCategories[1]}</a>
              </div>
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
