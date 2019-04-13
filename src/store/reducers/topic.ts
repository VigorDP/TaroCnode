import { Topic } from '../records'
import { handleActions } from 'redux-actions'
import { getTopicByTabNameAction, clearTopicAction } from '../actions'
import Immutable from 'immutable'

const defaultMap = Immutable.Map({
  all: Immutable.List(),
  share: Immutable.List(),
  job: Immutable.List(),
  good: Immutable.List(),
  ask: Immutable.List()
})

export const topic = handleActions(
  {
    [getTopicByTabNameAction](state, { payload: { tab = 'all', data = [] } }) {
      return state.set(
        tab,
        data
          .map(getJsFormTopic)
          .map(item => new Topic(item))
          .reduce(($topicList, next) => $topicList.push(next), state.get(tab))
      )
    },
    [clearTopicAction](state, { payload: { tab } }) {
      return state.set(tab, Immutable.List())
    }
  },
  defaultMap
)

function getJsFormTopic(topic) {
  for (const key in topic) {
    if (topic.hasOwnProperty(key)) {
      const value = topic[key]
      switch (key) {
        case 'author_id':
          topic.authorId = value
          delete topic['author_id']
          break
        case 'create_at':
          topic.createdAt = value
          delete topic['create_at']
          break
        case 'last_reply_at':
          topic.lastRepliedAt = value
          delete topic['last_reply_at']
          break
        case 'reply_count':
          topic.replyCount = value
          delete topic['reply_count']
          break
        case 'visit_count':
          topic.visitCount = value
          delete topic['visit_count']
          break
        case 'author':
          topic.author = {
            loginName: value.loginname,
            avatarUrl: value.avatar_url
          }
          break
      }
    }
  }

  return topic
}
