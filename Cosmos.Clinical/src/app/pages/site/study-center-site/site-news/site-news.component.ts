import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-site-news',
  templateUrl: './site-news.component.html',
  styleUrls: ['./site-news.component.scss'],
})
export class SiteNewsComponent {
  faTrashCan = faTrashCan;
  faStarOfLife = faStarOfLife;
  showForm: boolean = false;
  handleNewForm() {
    this.showForm = !this.showForm;
  }
}
