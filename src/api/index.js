import { get } from 'utils/request'

const BASEURL = 'https://cnodejs.org/api/v1/'

export default function getTopicByTabName(params) {
  const { page, tab } = params
  return get({
    url: `${BASEURL}topics${tab ? `?tab=${tab}&page=${page}&limit=10` : ``}`,
    payload: {
      tab
    }
  })
}
