import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
  path: '',
  data: {
      breadcrumb: 'Hóa đơn'
  },
  children: [
      {
          path: 'hd-nhap',
          loadChildren: () => import('./bill-in/bill-in.module').then(m => m.BillInModule)
      },
      {
          path: 'hd-xuat',
          loadChildren: () => import('./bill-out/bill-out.module').then(m => m.BillOutModule)
      },
      
      {
          path: '',
          redirectTo: 'hd-xuat',
          pathMatch: 'full'
      }
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
