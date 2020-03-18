using Microsoft.AspNetCore.Mvc;
using Quan_Ly_Kho.Helper;
using Quan_Ly_Kho.Models;
using Quan_Ly_Kho.Reponsitories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Controllers
{
    [Route("/api/[controller]")]
    public class BillOutController : Controller
    {
        private readonly IBillOutReponsitory _billoutRepository;

        public BillOutController(IBillOutReponsitory billoutRepository)
        {
            _billoutRepository = billoutRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<BillOut>> GetAllAsync()
        {
            var BillIn = await _billoutRepository.ListAsync();
            return BillIn;
        }

        [HttpGet("getAllPaging")]
        public async Task<IActionResult> GetAllPaging([FromQuery]PagingParams pagingParams)
        {
            PagedList<BillOut> paged = await _billoutRepository.GetAllPagingAsync(pagingParams);

            Response.AddPagination(paged.CurrentPage, paged.PageSize, paged.TotalCount, paged.TotalPages);

            return Ok(paged);
        }



        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] BillOut resource)
        {

            var result = await _billoutRepository.SaveAsync(resource);


            return Ok(result);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _billoutRepository.DeleteAsync(id);


            return Ok(result);
        }

        [HttpDelete("DeleteWithName")]
        public async Task<IActionResult> DeleteWithName([FromBody] BillOut resource)
        {
            var result = await _billoutRepository.DeleteWithName(resource.Tenvtxuat);


            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] BillOut resource)
        {

            var result = await _billoutRepository.UpdateAsync(id, resource);


            return Ok(result);
        }
    }
}

