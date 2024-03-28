import { 
  AllowNull,
  Column, 
  Comment, 
  DataType, 
  Default, 
  Model, 
  Table 
} from 'sequelize-typescript'

@Table({
  tableName: 'visits',
  createdAt: true,
  updatedAt: true
})
export class Visit extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'patient_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'unit_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'insurance_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'doctor_id': number;

  @AllowNull(false)
  @Default(1)
  @Comment('1: Rawat Jalan | 2: Rawat Darurat | 3: Rawat Inap')
  @Column({
    type: DataType.TINYINT({
      length: 2
    })
  })
  'visit_type': number;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY
  })
  'date_visit': Date;

  @AllowNull(true)
  @Comment('Tanggal Pulang')
  @Column({
    type: DataType.DATE
  })
  'return_date': Date;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  'online_registration_id': number;
}