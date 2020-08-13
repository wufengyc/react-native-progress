import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Path } from 'react-native-svg';
import {
  SCALE_LONG_WIDTH,
  SCALE_SHORT_WIDTH,
  SCALE_MARGIN,
  STROKE_WIDTH,
  SCALE_COUNT,
  STROKE_FOREGROUND,
} from './constant';

export default class Scale extends PureComponent {
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

    drawScale() {
      /**
       * 画这些刻度需要有两个虚拟的圆，
       * 1.外面的大圆为刻度外点连成的圆
       * 2.里面的小圆为刻度内点连成的圆
       * 外圆跟圆心连成的线中，外圆与内圆那一段就是刻度，所以需要计算外圆和内圆上的点并画成线
       */

      const {
        x,
        y,
        radius,
        progress,
        stroke,
      } = this.props;

      // 根据进度计算出高亮的刻度的个数
      let highlightCount = 3;
      if (progress > 0 && progress < 100) {
        highlightCount += Math.round(progress / 100 * 51);
      } else if (progress === 100) {
        highlightCount = SCALE_COUNT;
      } else if (progress === 0) {
        highlightCount = 0;
      }

      // 外圆（大）的半径，内（小）圆的半径
      const bbRadius = radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_LONG_WIDTH; // 更大的圆（长刻度线）的半径
      const bRadius = radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_SHORT_WIDTH;
      const sRadius = radius + STROKE_WIDTH + SCALE_MARGIN;

      // 单个刻度到圆心连成的线之间的角度（两个长刻度之间共24条线,25个角）
      const singleAngle = 90 / 25;
      // 开始画刻度线的角度，起始角度
      const sAngle = 180 - singleAngle * 3;

      const scales = [];
      for (let i = 0; i < highlightCount; i++) {
        const angle = sAngle + singleAngle * i;
        let startRadius;
        let strokeWidth;
        // 如果角度为180、270、360，刻度线会长一点
        if (angle === 180 || angle === 270 || angle === 360) {
          startRadius = bbRadius;
          strokeWidth = 2;
        } else {
          startRadius = bRadius;
          strokeWidth = 1.3;
        }

        // 根据角度、圆心、半径计算圆上的点
        const bX = x + startRadius * Math.cos(angle / 180.0 * Math.PI);
        const bY = y + startRadius * Math.sin(angle / 180.0 * Math.PI);
        const sX = x + sRadius * Math.cos(angle / 180.0 * Math.PI);
        const sY = y + sRadius * Math.sin(angle / 180.0 * Math.PI);

        scales.push(
          <Path
            key={i}
            d={`M${bX} ${bY} L${sX} ${sY}`}
            stroke={stroke || STROKE_FOREGROUND}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        );
      }

      return scales;
    }

    render() {
      return this.drawScale();
    }
}
