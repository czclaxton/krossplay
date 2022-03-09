import Sequelize from 'sequelize'
import { userFactory } from './user'

if (!process.env.DATABASE_URL) throw 'Missing Database URL'

const dbConfig = {
  logging:
    (process.env.DATABASE_LOGGING || 'false').toLowerCase() === 'true'
      ? message => console.info(message)
      : false,
  pool: {
    max: 20,
  },
}

const sequelize = new Sequelize(process.env.DATABASE_URL, dbConfig)

const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
}

Object.keys(db).forEach(model => {
  if (typeof db[model].associate == 'function') {
    db[model].associate(db)
  }
})

export default db
