import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from "../../../../shared/models/pagination.model"
import { PagingParams } from '../../../../shared/params/paging-params.model'
import{BillOutService} from '../../../../shared/services/billout-service'
import { NzModalService } from 'ng-zorro-antd';
import { BillOut } from 'src/app/shared/models/billout.model';
import{NotifyService} from '../../../../shared/services/notify-service'
import{MessageConstant} from '../../../../shared/constants/message-constant'
import{ConfigConstant} from '../../../../shared/constants/config-constant'
import{BilloutModalComponent} from '../billout-modal/billout-modal.component'
@Component({
  selector: 'app-billout-list',
  templateUrl: './billout-list.component.html',
  styleUrls: ['./billout-list.component.scss']
})
export class BilloutListComponent implements OnInit {

  lstBillOut = [];
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

  constructor(private billoutService: BillOutService,
    private notify: NotifyService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.loadData()
  }
  loadData(reset: boolean = false): void {
    if (reset) {
      this.pagination.currentPage = 1;
    }

    this.billoutService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<BillOut[]>) => {

        this.pagination = res.pagination;

        this.lstBillOut = res.result;
        // console.log(res);
      });

  }
  delete(id: number) {

    // show mesage có muốn xóa hay không ? 
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.billoutService.delete(id).subscribe((res: boolean) => {
        if (res) {
          this.notify.success(MessageConstant.DELETED_OK_MSG);
          this.loadData();
        }
      });
    });
    this.billoutService.delete(id);
    this.loadData();
    console.log(id);
  }
  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới hóa đơn xuất',
      nzContent: BilloutModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        billout: { id: 0,tenvtxuat: "", ngayxuat: null, soluongxuat: null,dongiaxuat:null,tinhtrang:"", },
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  update(billout: BillOut) {
    const modal = this.modalService.create(
      {
        nzTitle: 'Sửa thông tin hóa đơn xuất',
        nzContent: BilloutModalComponent,
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
          billout,
          isAddNew: false
        }
      });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
    console.log(billout);
  }
  search(keyword: string) {
    this.pagingParams.searchValue = "tenvtxuat";
    this.pagingParams.searchKey = keyword;
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
