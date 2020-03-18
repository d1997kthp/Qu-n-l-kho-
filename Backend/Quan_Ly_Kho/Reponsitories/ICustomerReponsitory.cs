using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Reponsitories
{
    public interface ICustomerReponsitory
    {
        Task<IEnumerable<Customer>> ListAsync();
        Task<PagedList<Customer>> GetAllPagingAsync(PagingParams pagingParams);
        Task<Customer> SaveAsync(Customer customer);
        Task<Customer> DeleteAsync(int id);
        Task<Customer> DeleteWithName(string name);
        Task<Customer> UpdateAsync(int id, Customer resource);
    }
}
