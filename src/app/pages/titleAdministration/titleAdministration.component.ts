import { Component, OnInit } from '@angular/core';
import { AppService } from './titleAdministration.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ngxCsv } from 'ngx-csv/ngx-csv';


@Component({
  selector: 'app-titleAdministration',
  styleUrls: ['./titleAdministration.component.css'],
  templateUrl: './titleAdministration.component.html',
})

export class TitleAdministrationComponent implements OnInit{
  usuarios = [];
  cols: any[] = [];
  usuarioSeleccionado;
  exportColumns: any[];

  constructor(private appService: AppService) { 
   }

  ngOnInit(): void {
    this.cols = [
      { field: "id", header: "ID" },
      { field: "accionista", header: "Accionista" },
      { field: "estado", header: "Estado" },
      { field: "observacion", header: "Observación" },
      { field: "fecha", header: "Fecha" },
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getListaUsuarios();
  }

  getListaUsuarios(){
    this.appService.getListaUsuarios().subscribe(
      response => this.usuarios = response
    )
  }
  onRowSelect(event: any) {
    alert(`Id: ${this.usuarioSeleccionado.id}, Accionista: ${this.usuarioSeleccionado.accionista}, Estado: ${this.usuarioSeleccionado.estado} Observación: ${this.usuarioSeleccionado.observacion}, Fecha: ${this.usuarioSeleccionado.fecha}`) 
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.usuarios);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "usuarios");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

exportPdf() {
  const doc = new jsPDF('l', 'mm', 'a4');

  const head = [['ID', 'Accionista', 'Estado', 'Observación', 'fecha']];

  autoTable(doc, {
      head: head,
      body: this.toPdfFormat(),
      didDrawCell: (data) => { },
  });
  doc.save('usuarios.pdf');
}
toPdfFormat() {
  let data = [];
  for (var i = 0; i < this.usuarios.length; i++) {
      data.push([
          this.usuarios[i].id,
          this.usuarios[i].accionista,
          this.usuarios[i].estado,
          this.usuarios[i].observacion,
          this.usuarios[i].fecha,
      ]);
  }
  return data;
}

exportarCsv(){
  var opciones = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Lista de usuarios',
    useBom: true,
    headers: ["ID", "Accionista", "Estado", "Observación", "Fecha"],
  };

  new ngxCsv(this.usuarios, "usuarios", opciones);
}
}