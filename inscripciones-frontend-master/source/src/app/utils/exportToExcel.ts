import { Workbook, Worksheet, Font, Alignment } from 'exceljs';

export const exportToExcel = (
  data: any[],
  fileName: string = 'reporte.xlsx',
  includeRespuestaFormulario: boolean = false,
  categoriaNombre: string = ''
) => {
  if (!data || data.length === 0) {
    console.error('No hay datos para exportar.');
    return;
  }

  const modifiedData = data.map((row) => {
    return {
      ...row,
      inscripcion: row.inscripcion.nombre,
      sede: row.sede.nombre,
      instancia: row.instancia.nombre,
      categoria: categoriaNombre,
    };
  });

  if (!includeRespuestaFormulario) {
    modifiedData.forEach((row) => {
      if (row.respuestaFormulario) {
        delete row.respuestaFormulario;
      }
      delete row.formularioId;
      delete row.camposFormulario;
      delete row.formularioIdRefMongo;
      delete row.respuestaIdRefMongo;
      delete row.id_organismo;
      delete row.id_categoria;
      delete row.nombre_organismo;
      delete row.nombre_categoria;
    });
  }

  if (includeRespuestaFormulario) {
    modifiedData.forEach((row) => {
      if (row.respuestaFormulario) {
        for (const key in row.respuestaFormulario) {
          if (row.respuestaFormulario.hasOwnProperty(key)) {
            const formattedKey = key.replace(/_/g, ' ');
            row[formattedKey] = row.respuestaFormulario[key];
            if (
              row[formattedKey] === null ||
              row[formattedKey] === undefined ||
              row[formattedKey] === ''
            ) {
              row[formattedKey] = 'No disponible';
            }
          }
        }
        delete row.respuestaFormulario;
      }
      delete row.formularioId;
      delete row.camposFormulario;
      delete row.formularioIdRefMongo;
      delete row.respuestaIdRefMongo;
      delete row.id_organismo;
      delete row.id_categoria;
      delete row.nombre_organismo;
      delete row.nombre_categoria;
    });
  }

  const workbook = new Workbook();
  const worksheet: Worksheet = workbook.addWorksheet('Datos');

  const headerStyle = {
    font: {
      name: 'Arial',
      bold: true,
      size: 12,
    } as Font,
    alignment: {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    } as Alignment,
  };

  const cellStyle = {
    font: {
      name: 'Arial',
      size: 12,
    } as Font,
    alignment: {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    } as Alignment,
  };

  const headers = Object.keys(modifiedData[0]);

  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell) => {
    const headerText = cell.text;
    if (headerText !== '') {
      const formattedHeaderText = headerText.replace(/_/g, ' ');
      cell.value =
        formattedHeaderText.charAt(0).toUpperCase() +
        formattedHeaderText.slice(1);
      cell.style = headerStyle;
    }
  });

  modifiedData.forEach((row) => {
    const rowData = headers.map((header) => row[header]);
    const dataRow = worksheet.addRow(rowData);
    dataRow.eachCell((cell) => {
      cell.style = cellStyle;
    });
  });

  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell((cell) => {
      const cellText = cell.text;
      const columnLength = cellText ? cellText.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength + 2;
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
  });
};
