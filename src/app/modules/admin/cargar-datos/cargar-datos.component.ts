import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargar-datos',
  templateUrl: './cargar-datos.component.html',
  styleUrls: ['./cargar-datos.component.scss']
})
export class CargarDatosComponent implements OnInit {

  fileSelected: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file && (file.type === 'text/csv')) {
      this.fileSelected = file;
    } else {
      this.fileSelected = null;  // Asegúrate de que sea un archivo ZIP
      alert('Por favor selecciona un archivo CSV válido.');
    }
  }

  processFile(): void {
    if (this.fileSelected) {
      // Aquí puedes agregar la lógica para procesar el archivo ZIP
      console.log('Procesando el archivo CSV:', this.fileSelected.name);

      // Ejemplo de cómo podrías enviar el archivo a un servicio
      // this.uploadService.uploadZip(this.fileSelected).subscribe(...);
    }
  }
}
