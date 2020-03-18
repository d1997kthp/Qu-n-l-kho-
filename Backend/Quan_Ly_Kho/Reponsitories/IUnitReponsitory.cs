using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Reponsitories
{
    public interface IUnitReponsitory
    {
        Task<IEnumerable<Unit>> ListAsync();
        Task<PagedList<Unit>> GetAllPagingAsync(PagingParams pagingParams);
        Task<Unit> SaveAsync(Unit _obj);
        Task<Unit> DeleteAsync(int id);
        Task<Unit> DeleteWithName(string name);
        Task<Unit> UpdateAsync(int id, Unit resource);
    }
}
