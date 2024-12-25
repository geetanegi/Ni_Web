import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

class JsonToExcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Tom Brown', age: 35 }
      ]
    };
  }

  exportToExcel = () => {
    const { data } = this.state;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const s2ab = s => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };
    const file = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const fileName = 'data.xlsx';
    saveAs(file, fileName);
  }

  render() {
    return (
      <div>
        <button onClick={this.exportToExcel}>Export to Excel</button>
      </div>
    );
  }
}

export default JsonToExcel;
