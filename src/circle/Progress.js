import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Animated,
} from 'react-native';
import { Circle } from 'react-native-svg';

class Progress extends PureComponent {
    static defaultProps = {
        progress: 0,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { x, y, r, strokeWidth, stroke } = this.props;
        const circumference = Math.PI * 2 * r;
        return (
            <Circle
                cx={x}
                cy={y}
                r={r}
                // origin="50,50"
                // rotate="50"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={[circumference]}
                strokeDashoffset={circumference * ((100 - (this.props.progress || 0)) / 100)}
                fill="transparent"
            />
        );
    }
}

Progress.propTypes = {
    x: PropTypes.number.isRequired, // 圆心
    y: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired, // 半径
    strokeWidth: PropTypes.number.isRequired,
    stroke: PropTypes.string.isRequired,
    progress: PropTypes.number, // 进度
}

const styles = StyleSheet.create({
    svg: {
        transform: [
            { rotate: '45deg' },
            { rotateX: '180deg' },
        ]
    }
})

export default Animated.createAnimatedComponent(Progress)
