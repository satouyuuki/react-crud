import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Questions from './Questions/Questions';
import Question from './Question/Question';
import Callback from './Callback';

// functionの場合render()はいらない
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {/* <Questions/> */}
        <Route exact path="/" component={Questions} />
        <Route exact path="/question/:questionId" component={Question} />
        <Route exact path="/callback" component={Callback} />
      </div>
    )
  }
}

export default App;
