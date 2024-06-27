import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { take } from 'rxjs/operators';

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
    this.userService.getUserType().pipe(take(1)).subscribe(user_type => {
      if (user_type === 'artist') {
        console.log('artist')
        this.router.navigate(['/profile/artist']);
      } else if (user_type === 'local') {
        this.router.navigate(['/profile/local']);
      } else {
        console.log('la puta que te pario', user_type)
        this.router.navigate(['/home']);
      }
    });
  }
}
