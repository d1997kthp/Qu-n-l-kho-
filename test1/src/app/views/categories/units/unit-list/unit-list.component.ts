import { Component, OnInit } from '@angular/core';
import{UnitService} from '../../../../shared/services/unit-service'
import{Unit} from '../../../../shared/models/unit.model'
import{NotifyService} from '../../../../shared/services/notify-service'
import{MessageConstant} from '../../../../shared/constants/message-constant'
import{ConfigConstant} from '../../../../shared/constants/config-constant'
import { NzModalService } from 'ng-zorro-antd';
import{UnitModalComponent} from '../unit-modal/unit-modal.component'
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  lstUnits = [];
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

  constructor( private unitService:UnitService ,
    private notify :NotifyService,
    private modalService:NzModalService) { }

  ngOnInit() {
    this.loadData() 
  }
  loadData(reset:boolean=false): void {
    if (reset) {
      this.pagination.currentPage = 1;
    }
    
    this.unitService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Unit[]>) => {
        
        this.pagination = res.pagination;
        
        this.lstUnits = res.result;
        // console.log(res);
      });
      
  }
  delete(id: number){
    
    // show mesage có muốn xóa hay không ? 
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG,() => {
      this.unitService.delete(id).subscribe((res:boolean) => {
        if(res){
          this.notify.success(MessageConstant.DELETED_OK_MSG);
          this.loadData();
        }
      });
    });
    this.unitService.delete(id);
    this.loadData();
    console.log(id);
  }
  addNew(){
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới đơn vị tính',
      nzContent: UnitModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        unit: { id: 0, name: "",des: ""},
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  update(unit: Unit)
  {
    const modal = this.modalService.create(
      {
      nzTitle: 'Sửa thông tin đơn vị tính',
      nzContent: UnitModalComponent,
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
        unit,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
    console.log(unit);
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

