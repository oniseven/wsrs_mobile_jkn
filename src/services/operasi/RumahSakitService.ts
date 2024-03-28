import { IListOperasiRS } from "../../types/operasi/IListOperasiRS"

const getListOperasi = async (tanggalawal: string, tanggalakhir: string): Promise<IListOperasiRS[]> => {
  // lakulan pengambilan data operasi rumah sakti di database berdasarkan
  // tanggal awal dan tanggal akhir sesuai database masing-masing rumah sakit

  return [
      {
        kodebooking: "123456ZXC",
        tanggaloperasi: "2019-12-11",
        jenistindakan: "operasi gigi",
        kodepoli: "001",
        namapoli: "Poli Bedah Mulut",
        terlaksana: 1,
        nopeserta: "0000000924782",
        lastupdate: 1577417743000 
      },
      {
        kodebooking: "67890QWE",
        tanggaloperasi: "2019-12-11",
        jenistindakan: "operasi mulut",
        kodepoli: "001",
        namapoli: "Poli Bedah Mulut",
        terlaksana: 0,
        nopeserta: "",
        lastupdate: 1577417743000
      }
    ] // set [] apa bila tidak ada list
}

export default getListOperasi