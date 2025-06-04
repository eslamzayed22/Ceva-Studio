import { Component, OnInit, inject, signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { IuserData } from '../../core/interfaces/iuser-data';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { IuserOrders } from '../../core/interfaces/iuser-orders';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IuserAddress } from '../../core/interfaces/iuser-address';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgClass, CurrencyPipe, DatePipe, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  private readonly _UserService = inject(UserService);
  readonly _AuthService = inject(AuthService);

  private readonly _fb = inject(FormBuilder);

  userData: IuserData = {} as IuserData;
  userOrders: IuserOrders[] = [];
  userAddresses: IuserAddress[] = [];
  isSidebarOpen: boolean = false;
  activeSection: 'orders' | 'details' | 'addresses' = 'orders';

  addressForm!: FormGroup;
  passwordForm!: FormGroup;

  showPasswordForm = false;

  ngOnInit(): void {
    this._UserService.getLogedUserData().subscribe({
      next: (res) => {
        this.userData = res.data;
      },
    });

    this._UserService.getUserOrders().subscribe({
      next: (res) => {
        this.userOrders = res.data;
      },
    });

    this._UserService.getUserِAddress().subscribe({
      next: (res) => {
        this.userAddresses = res.data;
        // console.log(res);
      },
    });

    this.addressForm = this._fb.group({
      alias: ['', Validators.required],
      details: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      city: ['', Validators.required],
      postalCode: [''],
    });

    this.passwordForm = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  deleteAccount(): void {
    this._UserService.deleteUserAccount().subscribe({
      next: (res) => {
        console.log('Account deleted:', res);
      },
    });
  }

  setSection(section: 'orders' | 'details' | 'addresses') {
    this.activeSection = section;
  }

  addAddress(): void {
    if (this.addressForm.invalid) return;

    const addressData = this.addressForm.value;

    this._UserService.addUserAddress(addressData).subscribe({
      next: (res) => {
        console.log('Address added:', res);
        alert('Address added successfully!');
        this.addressForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert('Failed to add address.');
      },
    });
  }

  updatePass(): void {
    if (this.passwordForm.invalid) return;

    const passwordData = this.passwordForm.value;

    this._UserService.updateUserPass(passwordData).subscribe({
      next: (res) => {
        console.log('Password updated:', res);
        alert('Password updated successfully!');
        this.passwordForm.reset();
        this.showPasswordForm = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
