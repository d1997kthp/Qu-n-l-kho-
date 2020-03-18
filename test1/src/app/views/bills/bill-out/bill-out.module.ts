import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillOutRoutingModule } from './bill-out-routing.module';
import { BilloutModalComponent } from './billout-modal/billout-modal.component';
import { BilloutListComponent } from './billout-list/billout-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [BilloutModalComponent, BilloutListComponent],
  imports: [
    CommonModule,
    BillOutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  entryComponents: [BilloutModalComponent]
})
export class BillOutModule { }
