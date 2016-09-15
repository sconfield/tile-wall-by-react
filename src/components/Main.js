require('normalize.css/normalize.css');

import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import '../styles/main.styl';

import imgData from '../stores/Tile.json';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <TileList></TileList>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

const Tile = React.createClass({
  getInitialState: function() {
    return {
      expanded: false
    };
  },
  handleExpandChange: function(expanded) {
    this.setState({expanded: expanded});
  },
  handleToggle: function(event, toggle) {
    this.setState({expanded: toggle});
  },
  handleExpand: function() {
    this.setState({expanded: true});
  },
  handleReduce: function() {
    this.setState({expanded: false});
  },
  render: function () {
    return (
      <Card className="card" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.data.name}
          subtitle={this.props.data.title}
          avatar={yeomanImage}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="展开详情"
          />
        </CardText>
        <CardMedia expandable={true}
          overlay={<CardTitle title="豪凸瓷砖" subtitle="www.hao2home.com" />}>
          <img src={this.props.data.path} />
        </CardMedia>
        <CardTitle title={this.props.data.code} subtitle={this.props.data.type} expandable={true} />
        <CardText expandable={true}>
          {this.props.data.desc}
        </CardText>
      </Card>
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
      <div className="card-box">
        {imgData.map(createTile)}
      </div>
    );
  }
});
