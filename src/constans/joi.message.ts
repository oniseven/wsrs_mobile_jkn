const JoiMessage = {
  required: "{{#label}} dibutuhkan",
  empty: "{{#label}} tidak boleh kosong",
  min: "Panjang {{#label}} minimal harus {{#limit}} karakter",
  max: "Panjang {{#label}} maksimal harus {{#limit}} karakter",
  notValid: "{{#label}} tidak valid",
  length: "Panjang karakter {{#label}} harus {{#limit}} karakter",
  pattern: {
    base: "{{#label}} harus berisi satu Huruf Besar, satu Huruf Kecil, satu Angka, dan satu Spesial Karakter berikut @$!%*?_& \n contoh: !123_HaloDunia",
    baseLogin: "{{#label}} harus berisi Huruf Besar, Huruf Kecil, Angka, dan Spesial Karakter berikut @$!%*?_& \n contoh: !123_HaloDunia",
  },
  string: {
    base: "{{#label}} harus berupa text!"
  },
  number: {
    base: "{{#label}} harus berupa angka!"
  },
  date: {
    base: "{{#label}} harus berupa tanggal. Contoh: 2001-01-01",
    format: "{{#label}} harus dalam format 'YYYY-MM-DD'. Contoh: 2001-01-01",
    milliseconds: "{{#label}} harus dalam milliseconds"
  }
}

export default JoiMessage