import Taro from '@tarojs/taro'

const CODE_SUCCESS = '200'

function getStorage(key) {
  return Taro.getStorage({
    key
  }).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    Taro.setStorage({
      key: 'token',
      data: data['3rdSession'] || ''
    }),
    Taro.setStorage({
      key: 'uid',
      data: data['uid'] || ''
    })
  ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
async function fetch(options) {
  const {
    url,
    payload,
    method = 'GET',
    showToast = true
  } = options
  const token = await getStorage('token')
  const header = token ? {
    'WX-PIN-SESSION': token,
    'X-WX-3RD-Session': token
  } : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const {
      data
    } = res.data
    return {
      data,
      tab: payload.tab
    }
  }).catch((err) => {
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || '请求异常',
        icon: 'none'
      })
    }

    return Promise.reject({
      err
    })
  })
}
/* eslint-disable */
export function get(options) {
  return fetch(options)
}
