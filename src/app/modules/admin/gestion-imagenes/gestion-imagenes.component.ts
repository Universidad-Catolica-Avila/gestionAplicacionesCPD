import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-imagenes',
  templateUrl: './gestion-imagenes.component.html',
  styleUrls: ['./gestion-imagenes.component.scss']
})
export class GestionImagenesComponent implements OnInit {
  fileSelected: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file && (file.type === 'application/zip' || file.type == 'application/x-zip-compressed' || file.type == 'application/x-compressed')) {
      this.fileSelected = file;
    } else {
      this.fileSelected = null;  // Asegúrate de que sea un archivo ZIP
      alert('Por favor selecciona un archivo ZIP válido.');
    }
  }

  processFile(): void {
    if (this.fileSelected) {
      // Aquí puedes agregar la lógica para procesar el archivo ZIP
      console.log('Procesando el archivo ZIP:', this.fileSelected.name);

      // Ejemplo de cómo podrías enviar el archivo a un servicio
      // this.uploadService.uploadZip(this.fileSelected).subscribe(...);
    }
  }
}
