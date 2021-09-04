import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './shared/data-service.service';
import { NotificationService } from './shared/notification.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private dataService: DataServiceService,
    private notificationService: NotificationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'google-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/google-brands.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/linkedin-in-brands.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'github-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/github-brands.svg'
      )
    );
  }

  ngOnInit() {
    this.dataService.getAllHeroes();
    this.notificationService.notification$.subscribe((message) => {
      message.type === 'success'
        ? this.notificationService.success(message.msg)
        : this.notificationService.error(message.msg);
    });
  }
  title = 'heroes-app';
}
