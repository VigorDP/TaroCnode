import Taro, { Component } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import { getWindowHeight } from "utils/style";

import WxParse from "components/wxParse/wxParse";

import styles from "./wxParse.module.scss";
import "./markdown.scss";
/**
 * 需要注意的是，在项目的 config/index.js 文件中，有 copy 模板与样式的操作
 */
export default class ParseComponent extends Component {
  componentDidMount() {
    const article = this.$router.params.content;
    WxParse.wxParse("article", "html", article, this.$scope, 5);
    Taro.setNavigationBarTitle({ title: this.$router.params.title });
  }

  render() {
    return (
      <View className={styles.scrollview}>
        <ScrollView
          scrollY
          style={{ height: getWindowHeight() }}
          lowerThreshold={100}
          enableBackToTop
        >
          <import src='../../components/wxParse/wxParse.wxml' />
          <template is='wxParse' data='{{wxParseData:article.nodes}}' />
        </ScrollView>
      </View>
    );
  }
}
