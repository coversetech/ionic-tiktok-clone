import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TabsPage implements OnInit {
  currentTab: String = 'store';
  constructor() {}

  ngOnInit() {}

  setCurrentTab({ tab }: any) {
    this.currentTab = tab;
  }
}
