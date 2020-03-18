import{NotifyService} from '../../../../shared/services/notify-service';
import{MessageConstant} from '../../../../shared/constants/message-constant';
import{ConfigConstant} from '../../../../shared/constants/config-constant';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import {BillOutService} from '../../../../shared/services/billout-service';
import{BillOut} from '../../../../shared/models/billout.model';

@Component({
  selector: 'app-billout-modal',
  templateUrl: './billout-modal.component.html',
  styleUrls: ['./billout-modal.component.scss']
})
export class BilloutModalComponent implements OnInit {

  @Input() billout:BillOut;
  @Input() isAddNew: boolean;
  billoutForm: FormGroup;
  loadingSaveChanges: boolean;
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private billoutService: BillOutService,
    private notify: NotifyService) { }

  ngOnInit() {
    this.createForm();
    this.billoutForm.reset();
    this.billoutForm.patchValue(this.billout)
  }
  // tạo form
  createForm()
  {
    this.billoutForm = this.fb.group({
      id:[null],
      tenvtxuat:[null, [Validators.required]],
      ngayxuat:[null],
      soluongxuat:[null],
      dongiaxuat:[null],
      tinhtrang:[null],
    })
  }
 //xóa hiển thị
 destroyModal(){
  this.modal.destroy(false)
}
//lưu thay đổi
saveChanges(){
  const billout = this.billoutForm.getRawValue();
  //nếu thêm mới = true -> gửi ra mesage thành công
    if(this.isAddNew){
      if(billout.tenvtxuat=='')
      {
        this.notify.error(MessageConstant.LOSTDATA_MSG);
      }
      
      this.billoutService.addNew(billout).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    //không phải thì update
    else {
      this.billoutService.update(billout).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.UPDATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }
}
