import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAdminComponent } from "../../components/nav-admin/nav-admin.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, NavAdminComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
