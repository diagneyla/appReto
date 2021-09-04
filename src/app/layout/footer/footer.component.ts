import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
 readonly linkedinUrl: string = 'https://www.linkedin.com/in/diagneyla-s%C3%A1nchez-contreras-96415414a/';
 readonly githubUrl:string = 'https://github.com/diagneyla';
 readonly gmailUrl:string = 'neyla16@gmail.com';
  constructor() { }

  ngOnInit(): void {
  }

}
