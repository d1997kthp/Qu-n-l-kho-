using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Reponsitories
{
    public interface IBillOutReponsitory
    {
        Task<IEnumerable<BillOut>> ListAsync();
        Task<PagedList<BillOut>> GetAllPagingAsync(PagingParams pagingParams);
        Task<BillOut> SaveAsync(BillOut billOut);
        Task<BillOut> DeleteAsync(int id);
        Task<BillOut> DeleteWithName(string name);
        Task<BillOut> UpdateAsync(int id, BillOut resource);
    }
}
