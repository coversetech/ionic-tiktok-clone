import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class InboxPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
