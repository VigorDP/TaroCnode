import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtTabs, AtTabsPane } from "taro-ui";
// import { add, minus, asyncAdd } from "../../actions/counter";
import Tab from "./tab";
import styles from "./index.module.scss";

// @connect(
//   ({ counter }) => ({
//     counter
//   }),
//   dispatch => ({
//     add() {},
//     dec() {},
//     asyncAdd() {}
//   })
// )
class Index extends Component {
  config = {
    navigationBarTitleText: "CNode 社区"
  };

  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }

  handleUserInfo = data => {
    console.log(data);
  };

  componentWillUnmount() {}

  componentDidShow() {
    // Taro.getLocation({ type: "gcj02 " }).then(data => console.log(data));
    // Taro.showToast({
    //   title: "成功",
    //   icon: "success"
    // });
    // Taro.setTabBarBadge({ index: 1, text: "1" });
    // Taro.showLoading({
    //   title: "加载中..."
    // }).then(res =>
    //   setTimeout(() => {
    //     Taro.hideLoading();
    //   }, 2000)
    // );
  }

  componentDidHide() {}

  render() {
    const tabList = [
      { title: "全部" },
      { title: "精华" },
      { title: "分享" },
      { title: "问答" },
      { title: "招聘" }
    ];
    return (
      <View className={styles.home}>
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <Tab ownProps={{ tab: "all" }} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>
              标签页二的内容
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <Button
              className='btn-max-w'
              plain
              type='primary'
              open-type='getUserInfo'
              onGetUserInfo={this.handleUserInfo}
            >
              授权
            </Button>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Index;
