import React from 'react';

class URLForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: '',
        shortened: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleChange(event) {
      this.setState({url: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      fetch('http://localhost:5000/shorten/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: this.state.url }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.shortened) {
          this.setState({ shortened: data.shortened })
        }
      })
      .catch((error) => {
        alert(error);
      });
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          <label>
            Enter URL:
            <input type="url" value={this.state.url} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"  />
          </form>
          <br />
          <br />
          <div style={{ display:  this.state.shortened ? 'block': 'none' }}>
            Shortened URL is: { this.state.shortened }
          </div>
        </div>
      );
    }
  }

  export default URLForm;
