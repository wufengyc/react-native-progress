
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  leftWrap: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
  rightWrap: {
    position: 'absolute',
  },
  loader: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 1000,
  },
  innerCircle: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    color: '#888',
  },
});

class PercentageCircle extends Component {
  static propTypes = {
    color: PropTypes.string,
    bgcolor: PropTypes.string,
    innerColor: PropTypes.string,
    radius: PropTypes.number,
    percent: PropTypes.number,
    borderWidth: PropTypes.number,
    textStyle: PropTypes.array,
    disabled: PropTypes.bool,
    disabledText: PropTypes.string,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    const { percent, borderWidth, textStyle } = this.props;
    let leftTransformerDegree = '0deg';
    let rightTransformerDegree = '0deg';
    if (percent >= 50) {
      rightTransformerDegree = '180deg';
      leftTransformerDegree = `${(percent - 50) * 3.6}deg`;
    } else {
      rightTransformerDegree = `${percent * 3.6}deg`;
      leftTransformerDegree = '0deg';
    }

    this.state = {
      borderWidth: borderWidth < 2 || !borderWidth ? 2 : borderWidth,
      leftTransformerDegree,
      rightTransformerDegree,
      textStyle: textStyle || null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { percent } = nextProps;
    let leftTransformerDegree = '0deg';
    let rightTransformerDegree = '0deg';
    if (percent >= 50) {
      rightTransformerDegree = '180deg';
      leftTransformerDegree = `${(percent - 50) * 3.6}deg`;
    } else {
      rightTransformerDegree = `${percent * 3.6}deg`;
    }

    const { borderWidth } = this.props;
    this.setState({
      borderWidth: borderWidth < 2 || !borderWidth ? 2 : borderWidth,
      leftTransformerDegree,
      rightTransformerDegree,
    });
  }

  render() {
    const {
      disabled, radius, disabledText, bgcolor, color, innerColor, children, percent,
    } = this.props;
    if (disabled) {
      return (
        <View style={[styles.circle, {
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
        }]}
        >
          <Text style={styles.text}>{disabledText}</Text>
        </View>
      );
    }
    const {
      leftTransformerDegree, rightTransformerDegree, borderWidth, textStyle,
    } = this.state;
    return (
      <View style={[styles.circle, {
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        backgroundColor: bgcolor,
      }]}
      >
        <View style={[styles.leftWrap, {
          width: radius,
          height: radius * 2,
          left: 0,
        }]}
        >
          <View style={[styles.loader, {
            left: radius,
            width: radius,
            height: radius * 2,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: color,
            transform: [{ translateX: -radius / 2 },
              { rotate: leftTransformerDegree }, { translateX: radius / 2 }],
          }]}
          />
        </View>
        <View style={[styles.leftWrap, {
          left: radius,
          width: radius,
          height: radius * 2,
        }]}
        >
          <View style={[styles.loader, {
            left: -radius,
            width: radius,
            height: radius * 2,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: color,
            transform: [{ translateX: radius / 2 },
              { rotate: rightTransformerDegree }, { translateX: -radius / 2 }],
          }]}
          />
        </View>
        <View style={[styles.innerCircle, {
          width: (radius - borderWidth) * 2,
          height: (radius - borderWidth) * 2,
          borderRadius: radius - borderWidth,
          backgroundColor: innerColor,
        }]}
        >
          {children || (
          <Text style={[styles.text, textStyle]}>
            {percent}
            %
          </Text>
          )}
        </View>

      </View>
    );
  }
}

// set some attributes default value
PercentageCircle.defaultProps = {
  bgcolor: '#e3e3e3',
  innerColor: '#fff',
};

module.exports = PercentageCircle;
