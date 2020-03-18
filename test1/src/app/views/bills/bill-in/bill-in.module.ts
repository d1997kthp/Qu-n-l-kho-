import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillInRoutingModule } from './bill-in-routing.module';
import { BillinListComponent } from './billin-list/billin-list.component';
import { BillinModalComponent } from './billin-modal/billin-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [BillinListComponent, BillinModalComponent],
  imports: [
    CommonModule,
    BillInRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  entryComponents: [BillinModalComponent]
})
export class BillInModule { }
