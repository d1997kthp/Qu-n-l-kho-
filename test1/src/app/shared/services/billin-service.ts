import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BillIn } from '../models/billin.model'
import{PagingParams} from '../params/paging-params.model'
import{PaginatedResult} from '../models/pagination.model'
import{Observable} from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class BillInService {

    baseUrl = 'https://localhost:44372/api/billin/';

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get(this.baseUrl);
    }
    getAllPaging(page?: any, itemsPerPage?: any, pagingParams?: PagingParams): Observable<PaginatedResult<BillIn[]>> {
        const paginatedResult = new PaginatedResult<BillIn[]>();
    
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
    
        return this.http.get<BillIn[]>(this.baseUrl + 'getAllPaging', { observe: 'response', params })
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

    addNew(billin: BillIn) {
        return this.http.post(this.baseUrl, billin);
    }

    update(billin: BillIn) {
        return this.http.put(this.baseUrl+ billin.id, billin);
    }

    delete(id: any) {
        return this.http.delete(this.baseUrl + id);
    }
}