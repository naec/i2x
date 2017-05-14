import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 12,
};

class Rating extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      rating: props[0].value
    }
  }

  render() {
    let starsRefference = [];

    for(let i = 1; i <= 5; i++) {
      if(i<=this.state.rating){
        starsRefference.push(true);
      } else {
        starsRefference.push(false);
      }
    }

    return (<div>
      {starsRefference.map((value, index) => {
        return <FontIcon
        key={'star-'+index}
        className="material-icons"
        style={iconStyles}
        color={blue500}
        >{value ? 'star' : 'star_border'}</FontIcon>
      })}

      </div>)
  }
}

export default Rating;
