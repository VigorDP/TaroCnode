import Taro from '@tarojs/taro'

class Store {
  removeItem(key) {
    return Taro.removeStorageSync(key)
  }
  getItem(key) {
    return Taro.getStorageSync(key)
  }
  setItem(key, value) {
    return Taro.setStorageSync(key, value)
  }
  clear() {
    return Taro.clearStorageSync()
  }
}

module.exports = new Store()
