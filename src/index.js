import React from 'react';
import ReactDOM from 'react-dom';

//create our first component
class Test extends React.Component {
  render() {
    return <h1>Hello World...!</h1>
  }
}

class MyPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      id: null
    };
  }//constructor

  componentDidMount() {
    fetch('https://picsum.photos/v2/list')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        //handle errors
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }//componentDidMount

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.author}
              {item.url}
            </li>
          ))}
        </ul>
      );
    }
  }

}//MyPictures

ReactDOM.render(<Test />, document.getElementById('root'));
ReactDOM.render(<MyPictures />, document.getElementById('root'));
