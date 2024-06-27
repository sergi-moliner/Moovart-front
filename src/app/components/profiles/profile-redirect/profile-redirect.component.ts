import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-redirect',
  standalone: true,
  imports: [],
  templateUrl: './profile-redirect.component.html',
  styleUrl: './profile-redirect.component.scss'
})
export class ProfileRedirectComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserType().subscribe(userType => {
      if (userType === 'artist') {
        this.router.navigate(['/artist-profile']);
      } else if (userType === 'local') {
        this.router.navigate(['/local-profile']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
