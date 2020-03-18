import { Component, OnInit } from '@angular/core';
import{CustomerService} from '../../../../shared/services/customer-service'
import{Customer} from '../../../../shared/models/customer.model'
import{NotifyService} from '../../../../shared/services/notify-service'
import{MessageConstant} from '../../../../shared/constants/message-constant'
import{ConfigConstant} from '../../../../shared/constants/config-constant'
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';
import { NzModalService } from 'ng-zorro-antd';
import{CustomerModalComponent} from '../customer-modal/customer-modal.component'
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  lstCustomers = [];
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
  
    constructor(private customerService:CustomerService,
      private notify :NotifyService,
      private modalService:NzModalService) { }
  
    ngOnInit() {
      this.loadData() 
    }
    loadData(reset:boolean=false): void {
      if (reset) {
        this.pagination.currentPage = 1;
      }
      
      this.customerService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
        .subscribe((res: PaginatedResult<Customer[]>) => {
          
          this.pagination = res.pagination;
          
          this.lstCustomers = res.result;
          // console.log(res);
        });
        
    }
    delete(id: number){
      
      // show mesage có muốn xóa hay không ? 
      this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG,() => {
        this.customerService.delete(id).subscribe((res:boolean) => {
          if(res){
            this.notify.success(MessageConstant.DELETED_OK_MSG);
            this.loadData();
          }
        });
      });
      this.customerService.delete(id);
      this.loadData();
      console.log(id);
    }
    addNew(){
      const modal = this.modalService.create({
        nzTitle: 'Thêm mới khách hàng',
        nzContent: CustomerModalComponent,
        nzStyle: {
          top: ConfigConstant.MODAL_TOP_20PX
        },
        nzBodyStyle: {
          padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
        },
        nzMaskClosable: false,
        nzClosable: false,
        nzComponentParams: {
          customer: { id: 0, name: "",diachi: "",sdt: null},
          isAddNew: true
        }
      });
  
      modal.afterClose.subscribe((result: boolean) => {
        if (result) {
          this.loadData();
        }
      });
    }
    update(customer: Customer)
    {
      const modal = this.modalService.create(
        {
        nzTitle: 'Sửa thông tin khách hàng',
        nzContent: CustomerModalComponent,
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
          customer,
          isAddNew: false
        }
      });
  
      modal.afterClose.subscribe((result: boolean) => {
        if (result) {
          this.loadData();
        }
      });
      console.log(customer);
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
