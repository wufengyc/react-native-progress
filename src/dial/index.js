import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  ViewPropTypes,
} from 'react-native';
import Svg, {
  Path,
} from 'react-native-svg';
import Scale from './Scale';
import ArcPath from './ArcPath';
import {
  SCALE_LONG_WIDTH, SCALE_SHORT_WIDTH, SCALE_MARGIN, STROKE_WIDTH, SCALE_COUNT,
} from './constant';

const AnimatedScale = Animated.createAnimatedComponent(Scale);
const AnimatedArcPath = Animated.createAnimatedComponent(ArcPath);

// const spot = require('./spot.png');


export default class Dial extends PureComponent {
    static propTypes = {
      style: ViewPropTypes.style,
      progress: PropTypes.number,
      width: PropTypes.number,
    };

    constructor(props) {
      super(props);
      const { width } = props;
      const radius = width / 2 - SCALE_LONG_WIDTH - SCALE_MARGIN - STROKE_WIDTH - 5;
      this.state = {
        radius, // 圆弧半径
        anim: new Animated.Value(0),
      };
    }

    componentDidMount() {
      const { progress } = this.props;
      this.startAnimated(progress);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const { progress } = this.props;
      // 如果进度有变化，重新开始动画，改变进度
      if (progress !== nextProps.progress) {
        this.startAnimated(nextProps.progress);
      }
    }

    startAnimated(progress) {
      const { anim } = this.state;
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: progress,
        duration: 1500,
        easing: Easing.quad,
        useNativeDriver: false,
        // velocity: 1,
        // deceleration: 0.997,
      }).start();
    }

    /**
     * 画圆形进度
     * @param {*} x 圆心x轴坐标
     * @param {*} y 圆心y轴坐标
     * @param {*} radius 半径
     */
    drawArc(x, y, radius) {
      // （求半圆起点的坐标和终点的坐标）已知圆心，半径，角度，求圆上的点坐标
      const startX = x + radius * Math.cos(170 / 180.0 * Math.PI);
      const startY = y + radius * Math.sin(170 / 180.0 * Math.PI);
      const cX = x + radius * Math.cos(270 / 180.0 * Math.PI);
      const cY = y + radius * Math.sin(270 / 180.0 * Math.PI);
      const endX = x + radius * Math.cos(10 / 180.0 * Math.PI);
      const endY = y + radius * Math.sin(10 / 180.0 * Math.PI);
      return (
        <Path
          key="an"
          // 半圆路径，从起点经过中间，再到终点
          d={`M${startX} ${startY} A${radius} ${radius} 0 0 1 ${cX} ${cY} A${radius} ${radius} 0 0 1 ${endX} ${endY}`}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />
      );
    }

    /**
     * 画刻度线
     * @param {*} x 圆心x轴坐标
     * @param {*} y 圆心y轴坐标
     * @param {*} radius 进度圆的半径
     * @param {*} progress 进度
     */
    drawScale(x, y, radius) {
      /**
         * 画这些刻度需要有两个虚拟的圆，
         * 1.外面的大圆为刻度外点连成的圆
         * 2.里面的小圆为刻度内点连成的圆
         * 外圆跟圆心连成的线中，外圆与内圆那一段就是刻度，所以需要计算外圆和内圆上的点并画成线
         */

      // 外圆（大）的半径，内（小）圆的半径
      const bbRadius = radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_LONG_WIDTH; // 更大的圆（长刻度线）的半径
      const bRadius = radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_SHORT_WIDTH;
      const sRadius = radius + STROKE_WIDTH + SCALE_MARGIN;

      // 单个刻度到圆心连成的线之间的角度（两个长刻度之间共24条线,25个角）
      const singleAngle = 90 / 25;
      // 开始画刻度线的角度，起始角度
      const sAngle = 180 - singleAngle * 3;

      const scales = [];
      for (let i = 0; i < SCALE_COUNT; i++) {
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
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        );
      }

      return scales;
    }

    render() {
      const { width, style } = this.props;
      const { radius, anim } = this.state;
      const height = radius + 60;
      // 圆心坐标
      const x = width / 2;
      const y = height - 30;

      return (
        <Svg
          width={width}
          height={height}
          style={[styles.surface, style]}
        >
          {this.drawArc(x, y, radius)}
          {this.drawScale(x, y, radius)}
          <AnimatedArcPath
            x={x}
            y={y}
            radius={radius}
            progress={anim.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 100],
            })}
          />
          <AnimatedScale
            x={x}
            y={y}
            radius={radius}
            progress={anim.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 100],
            })}
          />
        </Svg>
      );
    }
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: 'transparent',
  },
});