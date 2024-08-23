import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Artisanry'
    },
    children: [
      {
        path: '',
        redirectTo: 'craftsperson',
        pathMatch: 'full'
      },
      {
        path: 'craftsperson',
        loadComponent: () => import('./craftsperson/craftsperson.component').then(m => m.CraftspersonComponent),
        data: {
          title: 'craftsperson'
        }
      },
      {
        path: 'product',
        loadComponent: () => import('./product/product.component').then(m => m.ProductComponent),
        data: {
          title: 'product'
        }
      }
    ]
  }
];

