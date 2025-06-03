// app/routes.ts
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
    {
        path: '',
        component: BlankLayoutComponent,
        children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
        { path: 'men', loadComponent: () => import('./components/men/men.component').then(c => c.MenComponent) },
        { path: 'women', loadComponent: () => import('./components/women/women.component').then(c => c.WomenComponent) },
        // { path: 'products', loadComponent: () => import('./components/products/products.component').then(c => c.ProductsComponent) },
        {path:'categories', loadComponent:()=> import('./components/categories/categories.component').then((c)=> c.CategoriesComponent)},
        {path:'about', loadComponent:()=> import('./components/about/about.component').then((c)=> c.AboutComponent)},
        { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then(c => c.DetailsComponent) },
        // { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent), canActivate: [authGuard] },
        // { path: 'wishlist', loadComponent: () => import('./components/wishlist/wishlist.component').then(c => c.WishlistComponent), canActivate: [authGuard] },
        { path: 'user', loadComponent: () => import('./components/user/user.component').then(c => c.UserComponent), canActivate: [authGuard] },
        { path: 'orders', loadComponent: () => import('./components/orders/orders.component').then(c => c.OrdersComponent), canActivate: [authGuard] },
        { path: 'orders/:id', loadComponent: () => import('./components/orders/orders.component').then(c => c.OrdersComponent), canActivate: [authGuard] },
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [logedGuard],
        children: [
        // { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
        { path: 'register', loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent) },
        { path: 'forget', loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then(c => c.ForgetpasswordComponent) },
        ]
    },
    { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) },
];
