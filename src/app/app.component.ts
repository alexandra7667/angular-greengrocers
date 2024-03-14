import { Component } from '@angular/core';
import { GreensService } from './greens/services/greens.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private greensService: GreensService) {}

  total: number = 0;
  //Get total from service
  ngOnInit() {
    // Subscribe to the observable in the service to receive updates to the total
    this.greensService.total$.subscribe((updatedTotal: number) => {
      this.total = updatedTotal;
    });
  }

  title = 'angular-green-grocers';
}
