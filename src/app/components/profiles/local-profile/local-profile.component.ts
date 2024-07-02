import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { PhotoService } from '../../../services/photo.service';
import { User, Local } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../guards/auth.guard';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-local-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './local-profile.component.html',
  styleUrl: './local-profile.component.scss'
})
export class LocalProfileComponent implements OnInit {

  ngOnInit(): void {

  }
}
