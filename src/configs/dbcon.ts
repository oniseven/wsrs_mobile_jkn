import path from 'path'
import { Sequelize } from 'sequelize-typescript'

const dbcon = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [path.join(__dirname, '/../models/*.ts')],
  define: {
    timestamps: false
  }
})

export default dbcon
