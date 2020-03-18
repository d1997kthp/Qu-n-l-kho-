using Microsoft.EntityFrameworkCore;
using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Reponsitories
{
    public class BillOutReponsitory : BaseRepository, IBillOutReponsitory
    {
        public BillOutReponsitory(AppDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<BillOut>> ListAsync()
        {
            return await _context.BillOuts.ToListAsync();
        }
        public async Task<PagedList<BillOut>> GetAllPagingAsync(PagingParams pagingParams)
        {
            IQueryable<BillOut> _query = from u in _context.BillOuts
                                         orderby u.Tenvtxuat
                                         select new BillOut { Id = u.Id, Tenvtxuat = u.Tenvtxuat, Ngayxuat = u.Ngayxuat, Soluongxuat = u.Soluongxuat, Dongiaxuat = u.Dongiaxuat, Tinhtrang = u.Tinhtrang };
            // Search
            if (pagingParams.SearchValue == "name")
            {
                if (string.IsNullOrEmpty(pagingParams.SearchKey) == false)
                {
                    _query = _query.Where(o => o.Tenvtxuat.Contains(pagingParams.SearchKey));
                }
            }

            if (pagingParams.SearchValue == "id")
            {
                if (string.IsNullOrEmpty(pagingParams.SearchKey) == false)
                {
                    int _id = Convert.ToInt32(pagingParams.SearchKey);

                    _query = _query.Where(o => o.Id == _id);
                }
            }

            //Sort 
            if (pagingParams.SortKey == "name")
            {
                if (pagingParams.SortValue == "ascend")

                    _query = _query.OrderBy(o => o.Tenvtxuat);
                else
                    _query = _query.OrderByDescending(o => o.Tenvtxuat);
            }

            if (pagingParams.SortKey == "id")
            {
                if (pagingParams.SortValue == "ascend")

                    _query = _query.OrderBy(o => o.Id);
                else
                    _query = _query.OrderByDescending(o => o.Id);
            }

            return await PagedList<BillOut>
                .CreateAsync(_query, pagingParams.PageNumber, pagingParams.PageSize);
        }
        public async Task<BillOut> SaveAsync(BillOut _obj)
        {
            await _context.BillOuts.AddAsync(_obj);
            await _context.SaveChangesAsync();

            return _obj;

        }
        public async Task<BillOut> DeleteAsync(int id)
        {
            var _obj = await _context.BillOuts.Where(o => o.Id == id).FirstOrDefaultAsync();
            if (_obj != null)
            {
                _context.BillOuts.Remove(_obj);

                await _context.SaveChangesAsync();
            }
            return _obj;
        }
        public async Task<BillOut> DeleteWithName(string name)
        {
            var _obj = await _context.BillOuts.Where(o => o.Tenvtxuat == name).FirstOrDefaultAsync();

            if (_obj != null)
            {
                _context.BillOuts.Remove(_obj);

                await _context.SaveChangesAsync();
            }
            return _obj;
        }
        public async Task<BillOut> UpdateAsync(int id, BillOut resource)
        {
            var _obj = await _context.BillOuts.Where(o => o.Id == id).FirstOrDefaultAsync();

            if (_obj != null)
            {
                _obj.Tenvtxuat = resource.Tenvtxuat;
                _obj.Ngayxuat = resource.Ngayxuat;
                _obj.Soluongxuat = resource.Soluongxuat;
                _obj.Dongiaxuat = resource.Dongiaxuat;
                _obj.Tinhtrang = resource.Tinhtrang;

                await _context.SaveChangesAsync();
            }
            return _obj;
        }
    }
}

