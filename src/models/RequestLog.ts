import { Column, DataType, Model, Table, Sequelize } from 'sequelize-typescript';

@Table({
  tableName: 'request_log'
})
export class RequestLog extends Model {
  @Column({
    type: DataType.STRING,
  })
  method!: string;

  @Column({
    type: DataType.STRING,
  })
  url!: string;

  @Column({
    type: DataType.TEXT,
  })
  body!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  headers!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  queryparam!: string;

  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  })
  timestamp!: Date;
}