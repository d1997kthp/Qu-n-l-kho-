using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Reponsitories
{

        public interface IInventoryRepository
        {
        Task<IEnumerable<Inventory>> ListAsync();
        Task<PagedList<Inventory>> GetAllPagingAsync(PagingParams pagingParams);
        Task<Inventory> SaveAsync(Inventory _obj);
        Task<Inventory> DeleteAsync(int id);
        Task<Inventory> DeleteWithName(string name);
        Task<Inventory> UpdateAsync(int id, Inventory resource);
        }
}
