using Microsoft.EntityFrameworkCore;
using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Reponsitories
{
    public class BillInReponsitory : BaseRepository, IBillInReponsitory
    {
        public BillInReponsitory(AppDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<BillIn>> ListAsync()
        {
            return await _context.BillIns.ToListAsync();
        }
        public async Task<PagedList<BillIn>> GetAllPagingAsync(PagingParams pagingParams)
        {
            IQueryable<BillIn> _query = from u in _context.BillIns
                                        orderby u.Tenvtnhap
                                        select new BillIn { Id = u.Id, Tenvtnhap = u.Tenvtnhap, Ngaynhap = u.Ngaynhap, Soluongnhap = u.Soluongnhap, Dongianhap = u.Dongianhap, Tinhtrang = u.Tinhtrang };
            // Search
            if (pagingParams.SearchValue == "name")
            {
                if (string.IsNullOrEmpty(pagingParams.SearchKey) == false)
                {
                    _query = _query.Where(o => o.Tenvtnhap.Contains(pagingParams.SearchKey));
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

                    _query = _query.OrderBy(o => o.Tenvtnhap);
                else
                    _query = _query.OrderByDescending(o => o.Tenvtnhap);
            }

            if (pagingParams.SortKey == "id")
            {
                if (pagingParams.SortValue == "ascend")

                    _query = _query.OrderBy(o => o.Id);
                else
                    _query = _query.OrderByDescending(o => o.Id);
            }

            return await PagedList<BillIn>
                .CreateAsync(_query, pagingParams.PageNumber, pagingParams.PageSize);
        }
        public async Task<BillIn> SaveAsync(BillIn _obj)
        {
            await _context.BillIns.AddAsync(_obj);
            await _context.SaveChangesAsync();

            return _obj;

        }
        public async Task<BillIn> DeleteAsync(int id)
        {
            var _obj = await _context.BillIns.Where(o => o.Id == id).FirstOrDefaultAsync();
            if (_obj != null)
            {
                _context.BillIns.Remove(_obj);

                await _context.SaveChangesAsync();
            }
            return _obj;
        }
        public async Task<BillIn> DeleteWithName(string name)
        {
            var _obj = await _context.BillIns.Where(o => o.Tenvtnhap == name).FirstOrDefaultAsync();

            if (_obj != null)
            {
                _context.BillIns.Remove(_obj);

                await _context.SaveChangesAsync();
            }
            return _obj;
        }
        public async Task<BillIn> UpdateAsync(int id, BillIn resource)
        {
            var _obj = await _context.BillIns.Where(o => o.Id == id).FirstOrDefaultAsync();

            if (_obj != null)
            {
                _obj.Tenvtnhap = resource.Tenvtnhap;
                _obj.Ngaynhap = resource.Ngaynhap;
                _obj.Soluongnhap = resource.Soluongnhap;
                _obj.Dongianhap = resource.Dongianhap;
                _obj.Tinhtrang = resource.Tinhtrang;

                await _context.SaveChangesAsync();
            }
            return _obj;
        }
    }
}

