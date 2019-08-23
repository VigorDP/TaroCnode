import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtButton } from 'taro-ui'
import styles from './index.module.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillReceiveProps() {}

  componentDidMount() {}

  componentDidHide() {}

  onGetUserInfo = data => {
    Taro.setNavigationBarTitle({ title: data.detail.userInfo.nickName }).then(() => {
      Taro.showToast({ title: '登录成功', icon: 'success' })
    })
    // console.log("object", data.detail);
  }

  onClick = () => {
    Taro.showToast({ title: '暂未实现', icon: 'none' })
  }

  onPay = () => {
    Taro.requestPayment({})
  }

  render() {
    return (
      <View className={styles.meContainer}>
        <AtButton className={styles.button} openType="getUserInfo" type="primary" onGetUserInfo={this.onGetUserInfo}>
          微信登录
        </AtButton>
        <AtButton className={styles.button} type="primary" onClick={this.onPay}>
          微信支付
        </AtButton>
        <AtList>
          <AtListItem
            title="设置"
            arrow="right"
            onClick={this.onClick}
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
          <AtListItem
            title="关于我们"
            arrow="right"
            onClick={this.onClick}
            thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
          />
          <AtListItem
            title="收货地址"
            extraText="详细信息"
            arrow="right"
            onClick={this.onClick}
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
          />
        </AtList>
      </View>
    )
  }
}

export default Index
