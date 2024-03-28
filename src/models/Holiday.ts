import { 
  Column, 
  DataType, 
  Length, 
  Model, 
  Table 
} from 'sequelize-typescript'

@Table({
  tableName: 'holidays',
})
export class Holiday extends Model {
  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  'date': Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  'description': string;
}