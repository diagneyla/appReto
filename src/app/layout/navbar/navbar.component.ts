import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter()

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  public onToggleSidenav = () => {
      this.sidenavToggle.emit()
  }

  get isLoggedIn(): boolean{
    return this.authService.isLoggedIn;
  }
}
