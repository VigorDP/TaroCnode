import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";

class Index extends Component {
  config = {
    navigationBarTitleText: "我的"
  };

  constructor(props) {
    super(props);
    // Taro.showLoading({
    //   title: "加载中..."
    // });
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentDidMount() {
    Taro.hideLoading();
  }

  componentDidHide() {}

  render() {
    return (
      <AtList>
        <AtListItem
          title='设置'
          arrow='right'
          thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
        />
        <AtListItem
          title='关于我们'
          arrow='right'
          thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
        />
        <AtListItem
          title='收货地址'
          extraText='详细信息'
          arrow='right'
          thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
        />
      </AtList>
    );
  }
}

export default Index;
