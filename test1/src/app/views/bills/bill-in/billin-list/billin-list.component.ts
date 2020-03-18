import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from "../../../../shared/models/pagination.model"
import { PagingParams } from '../../../../shared/params/paging-params.model'
import{BillInService} from '../../../../shared/services/billin-service'
import { NzModalService } from 'ng-zorro-antd';
import { BillIn } from 'src/app/shared/models/billin.model';
import{NotifyService} from '../../../../shared/services/notify-service'
import{MessageConstant} from '../../../../shared/constants/message-constant'
import{ConfigConstant} from '../../../../shared/constants/config-constant'
import{BillinModalComponent} from '../billin-modal/billin-modal.component'

@Component({
  selector: 'app-billin-list',
  templateUrl: './billin-list.component.html',
  styleUrls: ['./billin-list.component.scss']
})
export class BillinListComponent implements OnInit {

  lstBillIn = [];
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

  constructor(private billinService: BillInService,
    private notify: NotifyService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.loadData()
  }
  loadData(reset: boolean = false): void {
    if (reset) {
      this.pagination.currentPage = 1;
    }

    this.billinService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<BillIn[]>) => {

        this.pagination = res.pagination;

        this.lstBillIn = res.result;
        // console.log(res);
      });

  }
  delete(id: number) {

    // show mesage có muốn xóa hay không ? 
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.billinService.delete(id).subscribe((res: boolean) => {
        if (res) {
          this.notify.success(MessageConstant.DELETED_OK_MSG);
          this.loadData();
        }
      });
    });
    this.billinService.delete(id);
    this.loadData();
    console.log(id);
  }
  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới hóa đơn nhập',
      nzContent: BillinModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        billin: { id: 0,tenvtnhap: "", ngaynhap: null, soluongnhap: null,dongianhap:null,tinhtrang:"", },
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  update(billin: BillIn) {
    const modal = this.modalService.create(
      {
        nzTitle: 'Sửa thông tin hóa đơn xuất',
        nzContent: BillinModalComponent,
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
          billin,
          isAddNew: false
        }
      });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
    console.log(billin);
  }
  search(keyword: string) {
    this.pagingParams.searchKey = "tenvtnhap";
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
