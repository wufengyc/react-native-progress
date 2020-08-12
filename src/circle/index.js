import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    View,
    ViewPropTypes,
} from 'react-native';
import Svg, {
    Circle,
    Defs,
    LinearGradient,
    Stop,
} from 'react-native-svg';
import AnimatedProgress from './Progress';
import ProgressPointIndicator from './ProgressPointIndicator';
import { STROKE_WIDTH, STROKE_WIDTH_OUTER } from './constant';

/**
 * 圆形进度条
 */
export default class CircleProgress extends PureComponent {
    static defaultProps = {
        progress: 100,
        progressIndicator: 'none',
        // strokeColor: { background: '#FFFFFF', foreground: ['#CCCCCC', '#CCCCCC'] },
        // strokeWidth: { background: STROKE_WIDTH, foreground: STROKE_WIDTH_OUTER },
    }

    constructor(props) {
        super(props);
        this.init();
        this.state = {
            anim: new Animated.Value(0),
        }
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

    width = 0;
    cx = 0; // 圆心
    cy = 0;
    radius = 0; // 半径

    init() {
        const { width, radius } = this.props;
        let tRadius;
        // 如果传入宽度，则以宽度为准
        if (width) {
            this.width = width;
            tRadius = width / 2;
        } else if (radius) {
            this.width = radius * 2;
            tRadius = radius;
        }

        this.radius = tRadius - STROKE_WIDTH_OUTER / 2;
        this.cx = this.radius + STROKE_WIDTH_OUTER / 2;
        this.cy = this.radius + STROKE_WIDTH_OUTER / 2;
    }

    startAnimated(progress) {
        if (!progress) {
            progress = 0;
        }
        const { anim } = this.state;
        // anim.setValue(0);
        Animated.timing(anim, {
          toValue: progress,
          duration: 800,
          easing: Easing.quad,
          useNativeDriver: false,
        //   velocity: 1,
        //   deceleration: 0.997,
        }).start();
    }

    renderForegroundColors(strokeColor) {
        let stroke = ['#CCCCCC', '#CCCCCC'];
        if (strokeColor && strokeColor.foreground && strokeColor.foreground.length > 0) {
            stroke = strokeColor.foreground;
        }
        const space = 100 / stroke.length;

        // 计算渐变起始点和终点
        const x1 = this.cx + this.radius * Math.cos(90 / 180.0 * Math.PI);
        const y1 = this.cy + this.radius * Math.sin(90 / 180.0 * Math.PI);
        const x2 = this.cx + this.radius * Math.cos(-90 / 180.0 * Math.PI);
        const y2 = this.cy + this.radius * Math.sin(-90 / 180.0 * Math.PI);
        return (
            <Defs>
                <LinearGradient
                    id="outer_circle"
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    // objectBoundingBox 表示将以应用渐变的元素形成的坐标系统为参考，x1、y1、x2与y2属性值都是0-1之间的数字，当然也可以是百分比数字（0-100%），那么渐变的尺寸是一个相对值，随元素尺寸变化而发生改变
                    // userSpaceOnUse 以当前用户坐标系统为参考，x1、y1、x2与y2都是绝对值
                    gradientUnits="userSpaceOnUse"
                    // x1="0%"
                    // y1="0%"
                    // x2="0%"
                    // y2="100%"
                    // gradientTransform="rotate(45)"
                >
                    {
                        stroke.map((color, index) => {
                            let offset;
                            if (index == stroke.length - 1) {
                                offset = '100%';
                            } else {
                                offset = `${space * index}%`;
                            }
                            return <Stop key={index} offset={offset} stopColor={color} stopOpacity="1" />
                        })
                    }
                </LinearGradient>
            </Defs>
        )
    }

    renderIndicator() {
        const { progressIndicator, indicatorRadius } = this.props;
        if (progressIndicator == 'none') {
            return null;
        }
        if (progressIndicator == 'circle') {
            const { anim } = this.state;
            return (
                <ProgressPointIndicator
                    x={this.cx}
                    y={this.cy}
                    r={this.radius}
                    pointRadius={indicatorRadius}
                    progress={anim.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 100],
                    })}
                />
            )
        }

        return null;
    }

    renderProgress() {
        const { anim } = this.state;
        const { strokeColor, strokeWidth, fill, style } = this.props;
        let stroke = '#FFFFFF';
        if (strokeColor && strokeColor.background) {
            stroke = strokeColor.background;
        }
        let strokeWidthBg = STROKE_WIDTH;
        let strokeWidthFg = STROKE_WIDTH_OUTER;
        if (strokeWidth) {
            if (strokeWidth.background) {
                strokeWidthBg = strokeWidth.background;
            }
            if (strokeWidth.foreground) {
                strokeWidthFg = strokeWidth.foreground;
            }
        }

        return (
            <Svg
                width={this.width}
                height={this.width}
                // origin={`${this.radius},${this.radius}`}
                style={[styles.svg, style]}>
                {this.renderForegroundColors(strokeColor)}
                <Circle
                    cx={this.cx}
                    cy={this.cy}
                    r={this.radius}
                    stroke={stroke}
                    strokeWidth={strokeWidthBg}
                    fill={fill || 'transparent'}
                />
                <AnimatedProgress
                    x={this.cx}
                    y={this.cy}
                    r={this.radius}
                    stroke="url(#outer_circle)"
                    strokeWidth={strokeWidthFg}
                    progress={anim.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 100],
                    })}
                />
                {this.renderIndicator()}
            </Svg>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderProgress()}
                <View style={styles.children}>
                    {this.props.children || null}
                </View>
            </View>
        );
    }
}

CircleProgress.propTypes = {
    style: ViewPropTypes.style,
    width: PropTypes.number, // 控件宽
    radius: PropTypes.number, // 半径
    progress: PropTypes.number, // 进度
    progressIndicator: PropTypes.oneOf(['none', 'circle']), // 进度条指示器类型
    indicatorRadius: PropTypes.number, // 指示器的半径（如果指示器是圆的话）
    strokeColor: PropTypes.shape({ // 颜色，背景色、前景色
        background: PropTypes.string,
        foreground: PropTypes.arrayOf(PropTypes.string),
    }),
    strokeWidth: PropTypes.shape({ // 宽度，背景宽度、前景宽度
        background: PropTypes.number,
        foreground: PropTypes.number,
    }),
    fill: PropTypes.string, // 填充颜色
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    children: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svg: {
        transform: [
            { rotate: '135deg' },
        ]
    },
    progress: {
        transform: [
            { rotate: '90deg' },
        ]
    },
    
})
