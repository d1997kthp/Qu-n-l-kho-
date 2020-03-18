import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{BilloutListComponent} from './billout-list/billout-list.component'

const routes: Routes = [
  {
    path: '',
    data: {
        breadcrumb: 'Hóa đơn xuất'
    },
    children: [
        {
            path: 'hoa-don',
            component: BilloutListComponent,
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
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillOutRoutingModule { }
