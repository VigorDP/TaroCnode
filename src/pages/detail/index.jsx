import Taro, { Component } from "@tarojs/taro";
import { ScrollView, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";

class Index extends Component {
  config = {
    navigationBarTitleText: "详情"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillMount() {
    Taro.showLoading({
      title: "加载中..."
    });
  }

  componentDidShow() {
    Taro.hideLoading();
  }

  componentDidHide() {}

  render() {
    return (
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop='0'
        style='height: 1500px;'
      >
        <Text>{this.$router.params.content}</Text>
      </ScrollView>
    );
  }
}

export default Index;
