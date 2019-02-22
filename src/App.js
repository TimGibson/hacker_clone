import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { stories: [] }
  }

  componentDidMount(){
    axios
        .get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then(res => {
            for (let i = 0; i<10; i++){
                this.getStory(res.data[i])
            }
        });
  }

  getStory = (id) => {
      axios
          .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
          .then(res => {
              this.setState({ stories: this.state.stories.concat([res.data])})
          });
  };


  render() {
    console.log(this.state.stories);
    return (
      <div className="App">
          <div className="storyContainer">
              {this.state.stories.map((curr) => {
                  return (
                      <div>{curr.title}</div>
                  )
              }
              )}
          </div>
      </div>
    );
  }
}

export default App;
