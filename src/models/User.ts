import { Column, DataType, Default, Length, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  'name':string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  'username': string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  'pwd': string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  'insurance_id': number;

  @Length({max: 1})
  @Default(1)
  @Column({
    type: DataType.TINYINT,
    allowNull: false
  })
  'is_active': number;
}