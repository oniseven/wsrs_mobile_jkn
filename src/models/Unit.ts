import { Column, Comment, DataType, Default, HasMany, Length, Model, Table } from 'sequelize-typescript'
import { DoctorSchedule } from './DoctorSchedule';

@Table({
  tableName: 'units',
})
export class Unit extends Model {
  @Length({
    max: 100
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  'name': string;

  @Length({
    max: 20
  })
  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  'bpjs_code': string;

  @Length({
    max: 1
  })
  @Default(0)
  @Comment('Status untuk menandakan apakan unit merupakan unit yg bisa digunakan untuk pendaftaran melalui Mobile JKN')
  @Column({
    type: DataType.TINYINT({
      length: 1,
      unsigned: true
    }),
    allowNull: false
  })
  'is_jkn': number;

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

  @HasMany(() => DoctorSchedule)
  'unit_schedules': DoctorSchedule[];
}