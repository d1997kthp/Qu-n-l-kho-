import { Component, OnInit } from '@angular/core';
import{InventoryService} from "../../../../shared/services/inventory-service"
import{Inventory} from '../../../../shared/models/inventory.model'
import{NotifyService} from '../../../../shared/services/notify-service'
import{MessageConstant} from '../../../../shared/constants/message-constant'
import{ConfigConstant} from '../../../../shared/constants/config-constant'
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';
import { NzModalService } from 'ng-zorro-antd';
import{InventoryModalComponent} from '../inventory-modal/inventory-modal.component'


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
lstInventories = [];
pagination: Pagination = {
  currentPage: 1,
  itemsPerPage: 10
}

pagingParams: PagingParams = {
  pageNumber: 1,
  pageSize: 10,
  keyword: '',
  sortKey: '',
  sortValue: '',
  searchKey: '',
  searchValue: ''
};

  constructor(private inventoryService:InventoryService,
    private notify :NotifyService,
    private modalService:NzModalService) { }

  ngOnInit() {
    this.loadData() 
  }
  loadData(reset:boolean=false): void {
    if (reset) {
      this.pagination.currentPage = 1;
    }
    
    this.inventoryService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Inventory[]>) => {
        
        this.pagination = res.pagination;
        
        this.lstInventories = res.result;
        // console.log(res);
      });
      
  }
  delete(id: number){
    
    // show mesage có muốn xóa hay không ? 
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG,() => {
      this.inventoryService.delete(id).subscribe((res:boolean) => {
        if(res){
          this.notify.success(MessageConstant.DELETED_OK_MSG);
          this.loadData();
        }
      });
    });
    this.inventoryService.delete(id);
    this.loadData();
    console.log(id);
  }
  addNew(){
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới kho',
      nzContent: InventoryModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        inventory: { id: 0, name: ""},
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  update(inventory: Inventory)
  {
    const modal = this.modalService.create(
      {
      nzTitle: 'Sửa thông tin vật tư',
      nzContent: InventoryModalComponent,
      nzStyle: 
      {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: 
      {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: 
      {
        inventory,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
    console.log(inventory);
  }
  search(keyword: string) {
    this.pagingParams.searchKey = "name";
    this.pagingParams.searchValue = keyword;
    this.loadData(true);
  }
  sort(sort: { key: string, value: string }): void {
    this.pagingParams.sortKey = sort.key;
    this.pagingParams.sortValue = sort.value;
    console.log(this.pagingParams);
    this.loadData();
  }
  searchColumn(searchKey: string) {
    this.pagingParams.searchKey = searchKey;
    console.log(this.pagingParams);
    this.loadData();
  }
}