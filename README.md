
# react-native-progress
ReactNative进度组件：圆形、条形、刻度......，带动画。

## Getting started

`$ npm install react-native-wf-progress --save`


## Usage
圆形进度条

<img src="https://github.com/wufengyc/react-native-progress/blob/master/example/1.jpg" height=400 />
```javascript
import { CircularProgress } from 'react-native-wf-progress';

<CircularProgress
  width={200}
//  同等效果
//  radius={100}
  progress={80}
  progressIndicator="circle"
  strokeWidth={{ background: 5, foreground: 20 }}
  strokeColor={{ background: '#F7F7F9', foreground: ['#FF8F2C', '#F84238'] }}
  fill="#FFFFFF">
  <View />
</CircularProgress>
```
刻度进度条

<img src="https://github.com/wufengyc/react-native-progress/blob/master/example/2.jpg" height=400 />

```javascript
import { Dial } from 'react-native-wf-progress';

<Dial
  style={styles.dial}
  width={300}
  progress={70}
/>
```


## Props CircularProgress
<table>
  <tr>
    <th>props</th>
    <th>备注</th>
    <th width=250>type</th>
    <th>是否必须</th>
  </tr>
  <tr>
    <td>style</td>
    <td>样式</td>
    <td>ViewPropTypes.style</td>
    <td>非必须</td>
  </tr>
  <tr>
    <td>width</td>
    <td>控件宽。控件必然为正方形，会根据width或radius自动计算出相应尺寸</td>
    <td>number</td>
    <td>width、radius必须传一个。若都传则以width为准</td>
  </tr>
  <tr>
    <td>radius</td>
    <td>圆的半径</td>
    <td>number</td>
    <td>width、radius必须传一个。若都传则以width为准</td>
  </tr>
  <tr>
    <td>progress</td>
    <td>进度</td>
    <td>number，0-100范围</td>
    <td>非必须</td>
  </tr>
  <tr>
    <td>progressIndicator</td>
    <td>进度条指示器类型，目前只支持"小圆点"</td>
    <td>'none' | 'circle'</td>
    <td>非必须，默认none</td>
  </tr>
  <tr>
    <td>indicatorRadius</td>
    <td>指示器半径，如果指示器是圆的话</td>
    <td>number</td>
    <td>非必须，默认5</td>
  </tr>
  <tr>
    <td>strokeColor</td>
    <td>进度条颜色，前景进度条支持渐变</td>
    <td>{<br/>
      &emsp;background: string,<br/>
      &emsp;foreground: arrayOf(string)<br/>
      }
    </td>
    <td>非必须。背景进度条默认'#FFFFFF'，前景默认['#CCCCCC', '#CCCCCC']</td>
  </tr>
  <tr>
    <td>strokeWidth</td>
    <td>进度条宽度</td>
    <td>{<br/>
      &emsp;background: number,<br/>
      &emsp;foreground: number<br/>
      }
    </td>
    <td>非必须。背景进度条宽度默认5，前景默认20</td>
  </tr>
  <tr>
    <td>fill</td>
    <td>内圆的填充颜色</td>
    <td>string</td>
    <td>非必须。默认透明</td>
  </tr>
</table>

## Props Dial
目前Dial暂不支持更多的属性，比如进度条颜色，后面会加上。
<table>
  <tr>
    <th>props</th>
    <th>备注</th>
    <th width=250>type</th>
    <th>是否必须</th>
  </tr>
  <tr>
    <td>style</td>
    <td>样式</td>
    <td>ViewPropTypes.style</td>
    <td>非必须</td>
  </tr>
  <tr>
    <td>width</td>
    <td>控件宽。会根据width自动计算出相应尺寸</td>
    <td>number</td>
    <td>必须</td>
  </tr>
  <tr>
    <td>progress</td>
    <td>进度</td>
    <td>number，0-100范围</td>
    <td>非必须</td>
  </tr>
</table>
