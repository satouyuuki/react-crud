import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {
          id: 1,
          body: "とりあえず表示してみる"
        },
        {
          id: 2,
          body: "私たち、いずれ書き換えられる運命"
        },
      ]
    };
    // 関数内のthisがインスタンスを指すように指定
    this.changeTask = this.changeTask.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
  };
  // レンダリングの前
  componentWillMount() {
    this.fetchTasks();
  }
  // render()の後
  // componentDidMount() {
  //   this.fetchTasks();
  // }

  changeTask(e) {
    const inputText = e.target.value;
    this.setState({ inputText: inputText });
    console.log(inputText);
  }

  submitTask() {
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: this.state.inputText })
    })
      .then(res =>
        console.log(res),
        this.fetchTasks
      );
  }

  // put 
  putTask(taskId) {
    fetch('http://localhost:3001/tasks/' + taskId, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: "やったよ" })
    })
      .then(this.fetchTasks);
  }

  deleteTask(taskId) {
    fetch('http://localhost:3001/tasks/' + taskId, {
      method: 'delete',
    })
      .then(this.fetchTasks);
  }

  fetchTasks() {
    fetch("http://localhost:3001/tasks")
      .then(response => response.json())
      .then(json => {
        this.setState({ tasks: json })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <div className="tasks">
          {
            this.state.tasks.map(task => {
              return (
                <div className="task" key={task.id}>
                  {task.body}
                  <button className="put" onClick={() => this.putTask(task.id)}>更新</button>
                  <button className="put" onClick={() => this.deleteTask(task.id)}>削除</button>
                </div>
              )
            })
          }
        </div>
        <div id="task-form">
          <input type="text" id="task-input" onChange={this.changeTask} />
          <button id="submit" onClick={this.submitTask}>送信</button>
        </div>
      </div>
    );
  }
}

export default App;