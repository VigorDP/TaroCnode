import { createAction } from 'redux-actions'
import { getTopicByTabName } from '../../service'
import * as Type from '../../constant/actionType'

/**
 * 获取主题内容
 */
export const getTopicByTabNameAction = createAction(
  Type.GET_TOPICS_BY_TAB,
  args => getTopicByTabName(args)
)
/**
 * 刷新时清除主题内容
 */
export const clearTopicAction = createAction(
  Type.CLEAR_TOPICS_BY_TAB,
  args => args
)
