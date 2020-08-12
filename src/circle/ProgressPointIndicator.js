import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    Animated,
} from 'react-native';
import {
    Circle,
} from 'react-native-svg';
import { POINT_RADIUS } from './constant';

/**
 * 进度指示器（在圆形进度条上的一个点）
 */
class ProgressPointIndicator extends PureComponent {
    static defaultProps = {
        progress: 0,
    }

    constructor(props) {
        super(props);
    }

    renderPoint() {
        const { x, y, r, progress, pointRadius } = this.props;
        // 根据角度(进度)、圆心、半径，算出圆上的点
        const angle = (progress || 0) / 100 * 360;
        
        const bX = x + r * Math.cos(angle / 180.0 * Math.PI);
        const bY = y + r * Math.sin(angle / 180.0 * Math.PI);

        return (
            <Circle
                cx={bX}
                cy={bY}
                r={pointRadius || POINT_RADIUS}
                strokeLinecap="round"
                fill="#FFFFFF"
            />
        );
    }

    render() {
        return this.renderPoint();
    }
}

ProgressPointIndicator.propTypes = {
    x: PropTypes.number.isRequired, // 圆心（进度条的圆心，并非是该指示器的圆心）
    y: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired, // 半径（进度条的半径）
    progress: PropTypes.number, // 进度（进度条的进度）

    pointRadius: PropTypes.number, // 指示器的半径
}

export default Animated.createAnimatedComponent(ProgressPointIndicator)
