import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notification$: Subject<Message> = new Subject();

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  constructor(public snackBar: MatSnackBar) { }
  
  success(msg: string) {
    this.config['panelClass'] = ['success', 'notification'];
    this.config['data'] = msg;
    this.snackBar.openFromComponent(SnackbarComponent, this.config)
  }

  error(msg: string) {
    this.config['panelClass'] = ['error', 'notification'];
    this.config['data'] = msg;
    this.snackBar.openFromComponent(SnackbarComponent, this.config)
  }

  info(msg: string) {
    this.config['panelClass'] = ['info', 'notification'];
    this.config['data'] = msg;
    this.snackBar.openFromComponent(SnackbarComponent, this.config)
  }
}

export interface Message{
  msg: string;
  type: string
}
