using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Reponsitories
{
    public interface IBillInReponsitory
    {
        Task<IEnumerable<BillIn>> ListAsync();
        Task<PagedList<BillIn>> GetAllPagingAsync(PagingParams pagingParams);
        Task<BillIn> SaveAsync(BillIn billIn);
        Task<BillIn> DeleteAsync(int id);
        Task<BillIn> DeleteWithName(string name);
        Task<BillIn> UpdateAsync(int id, BillIn resource);
    }
}
