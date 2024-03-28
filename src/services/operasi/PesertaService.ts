import { IListOperasiPeserta } from "../../types/operasi/IListOperasiPeserta";

const getOperasiPeserta = async (nopeserta: string): Promise<IListOperasiPeserta[]> => {
  // lakulan pengambilan data operasi peserta di database berdasarkan
  // tanggal awal dan tanggal akhir sesuai database masing-masing rumah sakit

  return [
    {
      kodebooking: "123456ZXC",
      tanggaloperasi: "2019-12-11",
      jenistindakan: "operasi gigi",
      kodepoli: "001",
      namapoli: "Poli Bedah Mulut",
      terlaksana: 0 
    }
  ] // set [] apa bila tidak ada list
}

export default getOperasiPeserta