import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  getHubLink : string = "https://github.com/MinaSamir20";
  whatsappLink : string = "https://wa.me/+201200197005";
  linkedInLink : string = "https://www.linkedin.com/in/mina-samir-9908a820b/";
}
