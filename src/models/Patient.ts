import { Column, DataType, Index, Length, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'patients',
})
export class Patient extends Model {
  @Length({
    max: 6
  })
  @Column({
    type: DataType.INTEGER({
      length: 6
    }).UNSIGNED.ZEROFILL,
    allowNull: false,
  })
  @Index({
    unique: true
  })
  'norm': number;

  @Length({
    max: 150
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  'name': string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  'address': string;

  @Length({
    max: 30
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  'phone': string;

  @Length({
    max: 60
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Index({
    unique: true
  })
  'nik': number;

  @Length({
    max: 60
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Index({
    unique: true
  })
  'insurance_number': number;
}