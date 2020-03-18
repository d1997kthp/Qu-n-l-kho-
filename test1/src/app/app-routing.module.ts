import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Trang chủ'
    },
    children: [
      {
        path: 'danh-muc',
        loadChildren: () => import('./views/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'hoa-don',
        loadChildren: () => import('./views/bills/bills.module').then(m => m.BillsModule)
      }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
