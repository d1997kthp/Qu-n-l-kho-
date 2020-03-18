import{NotifyService} from '../../../../shared/services/notify-service';
import{MessageConstant} from '../../../../shared/constants/message-constant';
import{ConfigConstant} from '../../../../shared/constants/config-constant';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import {BillInService} from '../../../../shared/services/billin-service';
import{BillIn} from '../../../../shared/models/billin.model';

@Component({
  selector: 'app-billin-modal',
  templateUrl: './billin-modal.component.html',
  styleUrls: ['./billin-modal.component.scss']
})
export class BillinModalComponent implements OnInit {

  @Input() billin:BillIn;
  @Input() isAddNew: boolean;
  billinForm: FormGroup;
  loadingSaveChanges: boolean;
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private billinService: BillInService,
    private notify: NotifyService) { }

  ngOnInit() {
    this.createForm();
    this.billinForm.reset();
    this.billinForm.patchValue(this.billin)
  }
  // tạo form
  createForm()
  {
    this.billinForm = this.fb.group({
      id:[null],
      tenvtnhap:[null, [Validators.required]],
      ngaynhap:[null],
      soluongnhap:[null],
      dongianhap:[null],
      tinhtrang:[null],
    })
  }
 //xóa hiển thị
 destroyModal(){
  this.modal.destroy(false)
}
//lưu thay đổi
saveChanges(){
  const billin = this.billinForm.getRawValue();
  //nếu thêm mới = true -> gửi ra mesage thành công
    if(this.isAddNew){
      if(billin.tenvtnhap=='')
      {
        this.notify.error(MessageConstant.LOSTDATA_MSG);
      }
      
      this.billinService.addNew(billin).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    //không phải thì update
    else {
      this.billinService.update(billin).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.UPDATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }

}
