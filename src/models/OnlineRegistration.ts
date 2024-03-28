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
  tableName: 'online_registrations',
  createdAt: true,
  updatedAt: true
})
export class OnlineRegistration extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  'bookingcode': string; // this booking code must be unique

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY
  })
  'datevisit': Date;

  @AllowNull(false)
  @Column(DataType.INTEGER({
    length: 6
  }).UNSIGNED.ZEROFILL)
  'norm': number;

  @AllowNull(false)
  @Column(DataType.STRING({
    length: 30
  }))
  'kodeanggota': string;

  @AllowNull(false)
  @Column(DataType.STRING({
    length: 50
  }))
  'noreferensi': string;

  @AllowNull(false)
  @Column(DataType.STRING({
    length: 35
  }))
  'nik': string;

  @AllowNull(false)
  @Column(DataType.STRING({
    length: 15
  }))
  'nohp': string;

  @AllowNull(false)
  @Column(DataType.STRING({
    length: 8
  }))
  'kodepoli': string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  'kodedokter': number;

  @AllowNull(false)
  @Column(DataType.STRING({
    length: 9
  }))
  'jampraktek_awal': string;

  @AllowNull(false)
  @Column(DataType.STRING({
    length: 9
  }))
  'jampraktek_akhir': string;

  @AllowNull(false)
  @Column({
    type: DataType.TINYINT({
      length: 2,
    })
  })
  'jeniskunjungan': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({
      length: 1,
    })
  })
  'checkin': number;

  @AllowNull(true)
  @Column({
    type: 'TIMESTAMP'
  })
  'checkin_at': Date;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({
      length: 1,
    })
  })
  'is_cancel': number;

  @AllowNull(true)
  @Column({
    type: 'TIMESTAMP'
  })
  'is_cancel_at': Date;

  @AllowNull(true)
  @Column(DataType.TEXT)
  'is_cancel_desc': string;

  @AllowNull(false)
  @Default(1)
  @Comment('1: PM Online | 2: Mobile JKN')
  @Column({
    type: DataType.TINYINT({
      length: 1,
    })
  })
  'online_type': number;
}