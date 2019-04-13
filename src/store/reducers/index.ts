import {
  combineReducers // 将顶层 state 改造为 immutable 对象
} from 'redux-immutable'
import { topic } from './topic'

const rootReducer = combineReducers({
  topic
})

export default rootReducer
