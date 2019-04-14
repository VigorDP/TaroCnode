import { View, ScrollView } from "@tarojs/components";
import Taro, { Component } from "@tarojs/taro";

class Link extends Component {
  render() {
    const props = this.props;
    return (
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop='0'
        style='height: 150px;'
        lowerThreshold='20'
        upperThreshold='20'
        onScrolltoupper={this.onScrolltoupper}
        onScroll={this.onScroll}
      >
        <View>1111</View>
      </ScrollView>
    );
  }
}

export default Link;
