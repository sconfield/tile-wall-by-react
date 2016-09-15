require('normalize.css/normalize.css');

import React from 'react';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import '../styles/main.styl';

import imgData from '../stores/Tile.json';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <TileBox></TileBox>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

const BOX_HEIGHT = document.body.clientHeight,
      BOX_WIDTH = document.body.clientWidth,
      TILE_HEIGHT = 130,
      TILE_WIDTH = 260;

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
      <Card className="card"
        style={this.props.putAnyWhere}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.data.name}
          subtitle={this.props.data.title}
          avatar={yeomanImage}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="展开详情" />
        </CardText>
        <CardMedia expandable={true}
          overlay={<CardTitle title="豪凸瓷砖" subtitle="www.hao2home.com" />}>
          <img src={this.props.data.path} />
        </CardMedia>
        <CardTitle title={'编号: '+this.props.data.code} subtitle={this.props.data.type} expandable={true} />
        <CardText expandable={true}>
          {this.props.data.desc}
        </CardText>
      </Card>
    );
  }
});

const TileBox = React.createClass({
  render: function() {
    const self = this;
    const createTile = function(tile, idx){
      const here = self.getAnyWhere(idx);
      return (
        <Tile key={idx} data={tile} putAnyWhere={here}></Tile>
      );
    };
    return (
      <div className="card-box">
        {imgData.map(createTile)}
      </div>
    );
  },
  getAnyWhere: function(idx){
    let any_x = BOX_WIDTH/2,
        any_y = BOX_HEIGHT/2;
    const any = Math.random();

    if (idx) {
      switch (idx%4) {
        case 0:
          any_x = BOX_WIDTH/2 * any;
          any_y = BOX_HEIGHT/2 * any;
          break;
        case 1:
          any_x = BOX_WIDTH/2 * (1+any);
          any_y = BOX_HEIGHT/2 * any;
          break;
        case 2:
          any_x = BOX_WIDTH/4 * (3+any);
          any_y = BOX_HEIGHT/2 * (1+any);
          break;
        case 3:
          any_x = BOX_WIDTH/4 * any;
          any_y = BOX_HEIGHT/2 * (1+any);
          break;
        default:
          any_x += 'px';
          any_y += 'px';
      }
    }

    idx = idx ? idx : 999;
    return {
      top: any_y - TILE_HEIGHT/2 + 'px',
      left: any_x - TILE_WIDTH/2 + 'px',
      zIndex: idx
    };
  }
});
