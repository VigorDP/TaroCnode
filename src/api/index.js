import {
  get
} from '../utils/request'

function getTopicByTabName(params ? : {}) {
  const {
    page,
    tab
  } = params
  return get(`topics${tab ? `?tab=${tab}&page=${page}&limit=10` : ``}`, {
    timeout: 10000
  })
}

export {
  getTopicByTabName
}
