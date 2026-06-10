import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarPersona } from './components/registrar-persona/registrar-persona';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RegistrarPersona],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('261CC341AngularSigconFrontend');
}
