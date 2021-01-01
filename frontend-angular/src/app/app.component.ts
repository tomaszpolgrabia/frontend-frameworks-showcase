import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  notYetImplementedModalActive = false;

  toggleModal(): void {
    this.notYetImplementedModalActive = !this.notYetImplementedModalActive;
  }

}
