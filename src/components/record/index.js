import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { blue500 } from 'material-ui/styles/colors';
import Rating from 'components/rating';
import './record.css';

const iconStyles = {
  marginRight: 12,
  marginLeft: 12,
};

class Record extends React.Component {
  constructor(...props) {
    super(...props);

    this.state = {
      ...props[0].value,
      isExpanded: false
    };

    this.onToggleExpand = this.onToggleExpand.bind(this);
  }

  onToggleExpand() {
    let isExpanded = !this.state.isExpanded;

    this.setState({ isExpanded });
  }

  render() {
    let isExpanded = this.state.isExpanded;

    let descriptionClassList = 'record-item-description-text';
    let expandButtonName = 'expand_more';

    if ( isExpanded ) {
      descriptionClassList += ' expanded';
      expandButtonName = 'expand_less';
    }

    return (
      <div className="record-item">
        <div className="record-item-audio">
          <audio controls preload="none">
            <source src={this.state.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="record-item-duration">
            {this.state.duration}
          </div>
        </div>
        <div className="record-item-description">
          <div className={descriptionClassList}>
            {this.state.final_script}
          </div>
          <div
            onClick={this.onToggleExpand}
            className="record-item-description-expand">
            
            <FontIcon
              className="material-icons"
              style={iconStyles}
              color={blue500}
              >{expandButtonName}</FontIcon>
          </div>
        </div>
        <div className="record-item-credencials">
          <div>
            <Rating value={this.state.rating} />
          </div>
          <div className="record-item-credencials-created">
            Added: {this.state.created}
          </div>
        </div>
      </div>
    )
  }
}

export default Record;
