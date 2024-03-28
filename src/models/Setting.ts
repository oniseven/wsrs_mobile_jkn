import { 
  Column, 
  DataType, 
  Default, 
  Length, 
  Model, 
  Table 
} from 'sequelize-typescript'

@Table({
  tableName: 'settings',
})
export class Setting extends Model {
  @Length({
    max: 100
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  'name': string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  'description': string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  'data': string;

  @Length({
    max: 1
  })
  @Default(1)
  @Column({
    type: DataType.TINYINT({
      length: 1,
      unsigned: true
    }),
    allowNull: false
  })
  'is_active': number;
}