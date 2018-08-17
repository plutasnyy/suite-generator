import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {addUrlToTest, hideUrlInput, toggleUrlInput, removeUrlFromTest} from "../../actions"

class AddURLBlock extends Component {
  constructor(props){
    super(props);

    this.state = {
      urlValue: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.hideUrlInput();
  }

  handleAddUrl() {
    this.props.toggleUrlInput();
  }

  handleInputChange(value) {
    this.setState({
      urlValue: value
    });
  }

  handleUrlAdded() {
    if(this.state.urlValue.length > 1) {
      this.props.addUrlToTest(this.state.urlValue);
      this.setState({
        urlValue: ""
      });
      this.props.toggleUrlInput()
    }
  }

  handleUrlDeletion(url) {
    this.props.removeUrlFromTest(url);
  }

  generateListOfUrls() {
    if(this.props.urls.length > 0) {
      return this.props.urls.map((url, index) => {
        return (
          <div key={index} className="block nested added-url" onClick={() => this.handleUrlDeletion(url)}>{url}</div>
        )
      });
    }
  }

  render () {
    return (
      <div className="urls-list">
        {this.props.urlInput.isUrlInputVisible ? (
          <div className="block nested add-url-input-container" id="addurl-empty-input">
            <input className="add-url-input" value={this.state.urlValue} onChange={(ev) => this.handleInputChange(ev.target.value)} placeholder="Enter URL here"></input>
            <div className="add-url-button" onClick={() => this.handleUrlAdded()}>+</div>
          </div>
        ) : (
          <div className="block nested add-url" id="addurl-empty" onClick={() => this.handleAddUrl()}>ADD URL</div>
        )}
        {this.generateListOfUrls()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    urls: state.urls,
    urlInput: state.urlInput,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addUrlToTest, hideUrlInput, toggleUrlInput, removeUrlFromTest}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddURLBlock);