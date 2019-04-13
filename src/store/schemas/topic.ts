import { schema } from 'normalizr'

// Define a user schema
const user = new schema.Entity('user')

// Define your article
const topicSchema = new schema.Entity('topic', {
  author: user
})

export { topicSchema }
