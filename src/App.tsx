import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      /**data saves the server responds.
       We use this state to parse data down to the child element
        (Graph) as element property*/

      data: [],
      showGraph: false,//changing this to hidden because this is the nitial state, we want it to be hidden uuntill the users clicks "start streaming"
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    /**we stored the boolean value of showGraph iside this variable 
     * to make it a bit more clear
    */

  //render the graph only if the 'showgraph' property is set to 'true'
    if (this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
    
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    //we start from the '0' on the 'x' axsis
    let X=0;
    const interval = setInterval(()=>{
      DataStreamer.getData((serverResponds: ServerRespond[])=>{
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      // we increment the value of 'x' to keep the graph moving
      X++;
      
      if (X>1000){
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
