import XLSX from "xlsx";

export function readStudentFile(file) {
  return new Promise(
    resolve => {
      let reader = new FileReader();
      let students = [];
      reader.onload = e => {
        let data = e.target.result;
        let wb = XLSX.read(data, { type: "binary" });
        let sheet = wb.Sheets[wb.SheetNames[0]];
        XLSX.utils.sheet_to_row_object_array(sheet).some(r => {
          let number = parseInt(r.__EMPTY);
          if (!isNaN(number)) {
            students.push({
              number: number,
              name: r.__EMPTY_1,
              clazz: r.__EMPTY_3
            });
          }
        });
      };
      reader.onloadend = () => {
        resolve(students);
      };
      reader.readAsBinaryString(file);
    },
    () => {}
  );
}
