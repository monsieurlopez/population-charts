import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import { Stack } from "react-bootstrap";
import SvgIcon from "../images/svg/csv-icon.svg";
import XlsIcon from "../images/svg/xls-icon.svg";
import * as XLSX from "xlsx";

export const DownloadTable = ({ countries, selectedCountries, dt }) => {
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportExcel = () => {
    const selectedData = selectedCountries.length > 0 ? selectedCountries : countries;
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAsExcelFile(excelBuffer, "countries");
  };

  const saveAsExcelFile = (buffer, fileName) => {
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  };

  return (
    <Stack direction="horizontal" gap={1} className="footer__icons-download">
      <img
        type="button"
        src={SvgIcon}
        alt="Icon Download CSV"
        onClick={() => exportCSV(true)}
        title="Export as CSV"
      />
      <img
        type="button"
        src={XlsIcon}
        alt="Icon Download XLS"
        onClick={exportExcel}
        title="Export as XLS"
      />
    </Stack>
  );
};

DownloadTable.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  dt: PropTypes.object.isRequired,
};
