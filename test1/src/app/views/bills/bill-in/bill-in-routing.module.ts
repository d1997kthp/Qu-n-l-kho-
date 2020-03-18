import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{BillinListComponent} from './billin-list/billin-list.component'

const routes: Routes = [{
  path: '',
  data: {
      breadcrumb: 'Hóa đơn nhập'
  },
  children: [
      {
          path: 'hoa-don',
          component: BillinListComponent,
          data: {
              breadcrumb: 'Hóa Đơn'
          }
      },
      {
          path: '',
          redirectTo: 'hoa-don',
          pathMatch: 'full'
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillInRoutingModule { }
