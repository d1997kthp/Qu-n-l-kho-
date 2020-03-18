using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using Quan_Ly_Kho.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Reponsitories
{
    public interface IStockRepository
    {
        Task<IEnumerable<Stock>> ListAsync();
        Task<PagedList<StockViewModel>> GetAllPagingAsync(PagingParams pagingParams);
        Task<Stock> SaveAsync(Stock _obj);
        Task<Stock> DeleteAsync(int id);
        Task<Stock> DeleteWithName(string name);
        Task<Stock> UpdateAsync(int id, Stock resource);
    }
}
