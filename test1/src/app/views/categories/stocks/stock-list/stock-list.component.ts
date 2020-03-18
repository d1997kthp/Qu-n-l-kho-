import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../../shared/services/stock-service'
import { Stock } from '../../../../shared/models/stock.model'
import { NotifyService } from '../../../../shared/services/notify-service'
import { MessageConstant } from '../../../../shared/constants/message-constant'
import { ConfigConstant } from '../../../../shared/constants/config-constant'
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';
import { NzModalService } from 'ng-zorro-antd';
import { StockModalComponent } from '../stock-modal/stock-modal.component'

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  lstStocks = [];
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

  constructor(private stockService: StockService,
    private notify: NotifyService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.loadData()
  }
  loadData(reset: boolean = false): void {
    if (reset) {
      this.pagination.currentPage = 1;
    }

    this.stockService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Stock[]>) => {

        this.pagination = res.pagination;

        this.lstStocks = res.result;
        // console.log(res);
      });

  }
  delete(id: number) {

    // show mesage có muốn xóa hay không ? 
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.stockService.delete(id).subscribe((res: boolean) => {
        if (res) {
          this.notify.success(MessageConstant.DELETED_OK_MSG);
          this.loadData();
        }
      });
    });
    this.stockService.delete(id);
    this.loadData();
    console.log(id);
  }
  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới vật tư',
      nzContent: StockModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        stock: { id: 0, name: "", unitId: 0, inventoryId: 0 ,unitName:"",inventoryName:"",},
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  update(stock: Stock) {
    const modal = this.modalService.create(
      {
        nzTitle: 'Sửa thông tin vật tư',
        nzContent: StockModalComponent,
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
          stock,
          isAddNew: false
        }
      });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
    console.log(stock);
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

