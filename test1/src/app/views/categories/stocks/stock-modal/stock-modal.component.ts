import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { StockService } from '../../../../shared/services/stock-service'
import { UnitService } from '../../../../shared/services/unit-service'
import { InventoryService } from '../../../../shared/services/inventory-service'
import { Stock } from '../../../../shared/models/stock.model'
import { NotifyService } from '../../../../shared/services/notify-service'
import { MessageConstant } from '../../../../shared/constants/message-constant'
import { ConfigConstant } from '../../../../shared/constants/config-constant'
import { Unit } from '../../../../shared/models/unit.model'
import { Inventory } from 'src/app/shared/models/inventory.model';
@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.scss']
})
export class StockModalComponent implements OnInit {

  @Input() stock: Stock;
  @Input() isAddNew: boolean;
  stockForm: FormGroup;
  loadingSaveChanges: boolean;
  listUnit = [];
  listIventory = [];
  unitId;
  inventoryId;

  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private stockService: StockService,
    private unitService: UnitService,
    private inventoryService: InventoryService,
    private notify: NotifyService) { }

  ngOnInit() {
    this.createForm();
    this.stockForm.reset();
     this.stockForm.patchValue(this.stock);
    //load listUnit để ra combobox 
    this.inventoryService.getAll().subscribe((res: Inventory[]) => {
      console.log(res);
      this.listIventory = res;
    });
    //load listIventory để ra combobox 
    this.unitService.getAll().subscribe((res: Unit[]) => {
      console.log(res);
      this.listUnit = res;
    });
  }
  
  // tạo form
  createForm() {
    this.stockForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      unitId: [null, [Validators.required]],
      inventoryId: [null, [Validators.required]],
      unitName:[null, [Validators.required]],
      inventoryName:[null, [Validators.required]],
      soluong:[null],
    });
  };
  //xóa hiển thị
  destroyModal() {
    this.modal.destroy(false)
  }
  //lưu thay đổi
  saveChanges() {
    const stock = this.stockForm.getRawValue();
    //nếu thêm mới = true -> gửi ra mesage thành công
    if (this.isAddNew) {

      // Log cai stock ra
      console.log(stock);
      if (this.isAddNew) {
      this.stockService.addNew(stock).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    //không phải thì update
    else {
      this.stockService.update(stock).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.UPDATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }
  }
}

