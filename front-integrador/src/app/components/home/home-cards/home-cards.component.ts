import { Component } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'home-cards',
  standalone: true,
  imports: [],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.scss'
})
export class HomeCardsComponent {
  cards: {img:string, title: string, description: string }[] = [
    { 
      img:'img_home/docCardiologia.jpg',
      title: 'Años de trayectoria', 
      description: 'Somos un grupo de profesionales altamente capacitados y experimentados. Contamos con más de 20 años de trayectoria profesional en el sector.' 
    },
    { 
      img:'img_home/docGinecologia.jpg',
      title: 'Tecnología de punta', 
      description: 'Gracias a la calidad de nuestros equipos de última generación, puede confiar en la precisión de sus resultados. Nos interesa su tranquilidad y su salud.' 
    },
    { 
      img:'img_home/docNutricionista.jpg',
      title: 'Siempre a la vanguardia', 
      description: 'Estamos constantemente innovando para brindar el mejor servicio. Es fundamental en nuestra organización el confort y la eficiencia en la atención de pacientes y clientes.' 
    }
  ];
}
