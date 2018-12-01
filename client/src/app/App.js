import React, { Fragment } from 'react';
import '../style/App.css';

import api from './util/api.js';

window.api = api;

const getPlayers = async ip => fetch(
  `https://use.gameapis.net/mc/query/players/${ip}`
).then(
  res => res.json()
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nPlayers: null
    };
  }
  async componentDidMount() {
    const { players } = await getPlayers('valence.duckdns.org');

    this.setState({
      nPlayers: players.online
    });
  }

  render() {
    const { nPlayers } = this.state;

    return (
      <div className="App">
        <h1>Valence Minecraft!</h1>
        <section className="container with-title">
          <h2 className="title">Number of Players Online:</h2>
          <center>
            {nPlayers === null
              ? <h3>Loading...</h3>
              : <Fragment>
                <h1>{nPlayers}</h1>
                <div>{
                  Array(parseInt(nPlayers)).fill().map((_, i) =>
                    <i className="icon star is-large" key={i}></i>
                  )
                }</div>
              </Fragment>}
          </center>
        </section>
      </div>
    );
  }
}

export default App;
