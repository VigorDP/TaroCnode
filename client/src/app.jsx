import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import configStore from "store/getStore";
import Index from "pages/home/index";

import "./custom-variables.scss";
import "./app.scss";

if (process.env.NODE_ENV !== "production" && process.env.TARO_ENV === "h5") {
  require("nerv-devtools");
}

wx.cloud.init();

wx.cloud.callFunction({
  // 云函数名称
  name: "test",
  // 传给云函数的参数
  data: {
    a: 1,
    b: 2
  },
  success(res) {
    console.log("clound", res.result.sum); // 3
  },
  fail: console.error
});

const store = configStore();
class App extends Component {
  config = {
    pages: ["pages/home/index", "pages/me/index", "pages/detail/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "CNode 社区",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#666",
      selectedColor: "#E93B3D",
      backgroundColor: "#fafafa",
      borderStyle: "white",
      list: [
        {
          pagePath: "pages/home/index",
          iconPath: "./assets/tab-bar/home.png",
          selectedIconPath: "./assets/tab-bar/home-active.png",
          text: "首页"
        },
        {
          pagePath: "pages/me/index",
          iconPath: "./assets/tab-bar/user.png",
          selectedIconPath: "./assets/tab-bar/user-active.png",
          text: "我的"
        }
      ]
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
