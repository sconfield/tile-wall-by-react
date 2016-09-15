require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import imgData from '../stores/Tile.json';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <TileList></TileList>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

const Tile = React.createClass({
  render: function () {
    return (
        <img src={this.props.data.path} alt={this.props.data.name} />
    );
  }
});

const TileList = React.createClass({
  render: function() {
    const createTile = function(tile, idx){
      return (
        <Tile key={idx} data={tile}></Tile>
      );
    };
    return (
      <div>
        {imgData.map(createTile)}
      </div>
    );
  }
});
