import { 
  AllowNull,
  Column, 
  DataType, 
  Default, 
  HasMany, 
  Model, 
  Table 
} from 'sequelize-typescript'
import { DoctorSchedule } from './DoctorSchedule';

@Table({
  tableName: 'doctors',
  createdAt: true,
  updatedAt: true
})
export class Doctor extends Model {
  @Column({
    type: DataType.INTEGER
  })
  "kodebpjs": number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(150)
  })
  "name": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(40)
  })
  "nip": string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({
      length: 1
    }).UNSIGNED
  })
  "is_active": number;

  @HasMany(() => DoctorSchedule)
  'schedules': DoctorSchedule[];
}