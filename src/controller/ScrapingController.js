import ScrapingService from "../services/ScrapingService.js"
import xlsx from "xlsx"

export default class ScrapingController {
  static async drogalider(req, res) {
    try {
      const data = await ScrapingService.getInfo()

      const convertToSheetData = (data) => {
        return data.map(item => ({
          Name: item.name || "N/A",
          Description: item.description || "N/A",
          Price: item.price || "N/A"
        }));
      };

      const sheetData = convertToSheetData(data);
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(sheetData);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Medicamentos");
      const filePath = './temp/Medicamentos.xlsx';
      xlsx.writeFile(workbook, filePath);

      res.status(200).json(data)
    } catch (err) {
      console.log(err)
      res.status(500).send("Deu ruim")
    }
  }

}