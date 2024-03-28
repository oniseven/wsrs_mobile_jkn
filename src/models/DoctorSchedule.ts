import { 
  AllowNull,
  BelongsTo,
  Column, 
  Comment, 
  DataType, 
  Default, 
  ForeignKey, 
  Model, 
  Table 
} from 'sequelize-typescript'
import { Doctor } from './Doctor';
import { Unit } from './Unit';

@Table({
  tableName: 'doctor_schedules',
  createdAt: true,
  updatedAt: true
})
export class DoctorSchedule extends Model {
  @ForeignKey(() => Doctor)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  "doctor_id": number;

  @BelongsTo(() => Doctor)
  "doctor": Doctor;

  @ForeignKey(() => Unit)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  "unit_id": number;

  @BelongsTo(() => Unit)
  "unit": Unit;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  "datesc": Date;

  @AllowNull(false)
  @Default('pagi')
  @Column({
    type: DataType.ENUM('pagi', 'sore', 'malam')
  })
  "day_status": string;

  @AllowNull(false)
  @Comment('contoh: 08:00')
  @Column(DataType.STRING(5))
  "start_time": string;

  @AllowNull(false)
  @Comment('contoh: 14:00')
  @Column(DataType.STRING(5))
  "end_time": string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  "quota_bpjs": number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  "quota_nonbpjs": number;

  @AllowNull(false)
  @Default(0)
  @Comment('quota total = quota_bpjs + quota_nonbpjs')
  @Column(DataType.INTEGER)
  "total_quota": number;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({
      length: 1
    }).UNSIGNED
  })
  "is_active": number;
}