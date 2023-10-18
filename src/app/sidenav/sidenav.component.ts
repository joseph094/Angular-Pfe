import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private auth : AuthService, private router:Router) { }

  ngOnInit(): void {
  }
 logout(){
   this.auth.LogoutUser();
   this.router.navigate(['/'])
 }
}
