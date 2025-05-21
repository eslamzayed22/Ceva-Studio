import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavUserComponent } from '../../components/nav-user/nav-user.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet, NavUserComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
