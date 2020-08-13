import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Path } from 'react-native-svg';
import {
  STROKE_WIDTH,
  STROKE_FOREGROUND,
} from './constant';


export default class ArcPath extends PureComponent {
    static propTypes = {
      progress: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
      radius: PropTypes.number,
      stroke: PropTypes.string,
    };

    constructor(props) {
      super(props);
      this.state = {
      };
    }

    componentDidMount() {
    }

    drawArc() {
      const {
        x,
        y,
        radius,
        progress,
        stroke,
      } = this.props;

      // （求半圆起点的坐标和终点的坐标）已知圆心，半径，角度，求圆上的点坐标
      const startX = x + radius * Math.cos(170 / 180.0 * Math.PI);
      const startY = y + radius * Math.sin(170 / 180.0 * Math.PI);
      const cX = x + radius * Math.cos(270 / 180.0 * Math.PI);
      const cY = y + radius * Math.sin(270 / 180.0 * Math.PI);
      const endX = x + radius * Math.cos(10 / 180.0 * Math.PI);
      const endY = y + radius * Math.sin(10 / 180.0 * Math.PI);

      let highlightPath = `M${startX} ${startY}`;
      // 通过进度，画出高亮的部分
      if (progress === 100) {
        highlightPath += `A${radius} ${radius} 0 0 1 ${cX} ${cY} A${radius} ${radius} 0 0 1 ${endX} ${endY}`;
      } else if (progress !== 0) {
        if (progress >= 50) {
          highlightPath += `A${radius} ${radius} 0 0 1 ${cX} ${cY}`;
        }
        const angle = 180 + 180 * progress / 100;
        const x1 = x + radius * Math.cos(angle / 180.0 * Math.PI);
        const y1 = y + radius * Math.sin(angle / 180.0 * Math.PI);
        highlightPath += `A${radius} ${radius} 0 0 1 ${x1} ${y1}`;
      }

      return (
        <Path
          key="high"
          // 半圆路径，从起点经过中间，再到终点
          d={highlightPath}
          stroke={stroke || STROKE_FOREGROUND}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />
      );
    }

    render() {
      return this.drawArc();
    }
}
