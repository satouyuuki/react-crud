import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Questions from './Questions/Questions';
import Question from './Question/Question';
// functionの場合render()はいらない
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {/* <Questions/> */}
        <Route exact path="/" component={Questions} />
        <Route exact path="/question/:questionId" component={Question}/>
      </div>
    )
  }
}

export default App;
