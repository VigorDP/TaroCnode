import { Record } from 'immutable'

export default Record({
  id: 0, // 主题ID
  createdAt: '', // 创建时间
  good: '', // 是否精华
  top: '', // 是否置顶
  title: '',
  content: '',
  authorId: '',
  author: {
    loginName: '',
    avatarUrl: ''
  },
  lastRepliedAt: '', // 最后一次回复时间
  replyCount: '', // 回复总数
  tab: '', // 所属tab
  visitCount: '' // 访问人数
})
