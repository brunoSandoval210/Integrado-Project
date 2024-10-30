import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cards: {img:string, title: string, description: string }[] = [
    { 
      img:'asents/img_home/docCardiologia.jpg',
      title: 'Años de trayectoria', 
      description: 'Somos un grupo de profesionales altamente capacitados y experimentados. Contamos con más de 20 años de trayectoria profesional en el sector.' 
    },
    { 
      img:'asents/img_home/docGinecologia.jpg',
      title: 'Tecnología de punta', 
      description: 'Gracias a la calidad de nuestros equipos de última generación, puede confiar en la precisión de sus resultados. Nos interesa su tranquilidad y su salud.' 
    },
    { 
      img:'asents/img_home/docNutricionista.jpg',
      title: 'Siempre a la vanguardia', 
      description: 'Estamos constantemente innovando para brindar el mejor servicio. Es fundamental en nuestra organización el confort y la eficiencia en la atención de pacientes y clientes.' 
    }
  ];
}
