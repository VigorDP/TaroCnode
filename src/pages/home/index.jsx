import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";

import AllTab from "./tab-all";
import GoodTab from "./tab-good";
import ShareTab from "./tab-share";
import AskTab from "./tab-ask";
import JobTab from "./tab-job";
import styles from "./index.module.scss";

class Index extends Component {
  config = {
    navigationBarTitleText: "CNode 社区"
  };

  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
    console.log("constructor");
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }

  handleUserInfo = data => {
    console.log(data);
  };

  componentWillMount() {
    console.log("will mount");
  }

  componentDidMount() {
    console.log("did mount");
  }

  componentDidShow() {
    console.log("did show");
  }

  componentDidHide() {
    console.log("did hide");
  }

  componentCatchError() {
    console.log("error");
  }

  componentDidCatchError() {
    console.log("did catch error");
  }

  render() {
    console.log("render");
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
          <AtTabsPane
            current={this.state.current}
            index={0}
            className={styles.panel}
          >
            <AllTab ownProps={{ tab: "all" }} />
          </AtTabsPane>
          <AtTabsPane
            current={this.state.current}
            index={1}
            className={styles.panel}
          >
            <GoodTab ownProps={{ tab: "good" }} />
          </AtTabsPane>
          <AtTabsPane
            current={this.state.current}
            index={2}
            className={styles.panel}
          >
            <ShareTab ownProps={{ tab: "share" }} />
          </AtTabsPane>
          <AtTabsPane
            current={this.state.current}
            index={3}
            className={styles.panel}
          >
            <AskTab ownProps={{ tab: "ask" }} />
          </AtTabsPane>
          <AtTabsPane
            current={this.state.current}
            index={4}
            className={styles.panel}
          >
            <JobTab ownProps={{ tab: "job" }} />
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Index;
