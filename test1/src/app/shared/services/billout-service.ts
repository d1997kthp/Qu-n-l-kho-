import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BillOut } from '../models/billout.model'
import{PagingParams} from '../params/paging-params.model'
import{PaginatedResult} from '../models/pagination.model'
import{Observable} from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class BillOutService {

    baseUrl = 'https://localhost:44372/api/billout/';

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get(this.baseUrl);
    }
    getAllPaging(page?: any, itemsPerPage?: any, pagingParams?: PagingParams): Observable<PaginatedResult<BillOut[]>> {
        const paginatedResult = new PaginatedResult<BillOut[]>();
    
        let params = new HttpParams();
        if (page != null && itemsPerPage != null) {
          params = params.append('pageNumber', page);
          params = params.append('pageSize', itemsPerPage);
        }
    
        if (pagingParams != null) {
          params = params.append('keyword', pagingParams.keyword);
          params = params.append('sortKey', pagingParams.sortKey);
          params = params.append('sortValue', pagingParams.sortValue);
          params = params.append('searchKey', pagingParams.searchKey);
          params = params.append('searchValue', pagingParams.searchValue);
        }
    
        return this.http.get<BillOut[]>(this.baseUrl + 'getAllPaging', { observe: 'response', params })
          .pipe(
            map(response => {
              paginatedResult.result = response.body;
              if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
              }
              return paginatedResult;
            })
          );
      }


    getDetail(id: any) {
        return this.http.get(this.baseUrl + id);
    }

    addNew(billout: BillOut) {
        return this.http.post(this.baseUrl, billout);
    }

    update(billout: BillOut) {
        return this.http.put(this.baseUrl+ billout.id, billout);
    }

    delete(id: any) {
        return this.http.delete(this.baseUrl + id);
    }
}