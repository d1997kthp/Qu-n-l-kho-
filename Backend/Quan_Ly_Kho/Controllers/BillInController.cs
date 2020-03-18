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
    public class BillInController : Controller
    {
        private readonly IBillInReponsitory _billinRepository;

        public BillInController(IBillInReponsitory billinRepository)
        {
            _billinRepository = billinRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<BillIn>> GetAllAsync()
        {
            var BillIn = await _billinRepository.ListAsync();
            return BillIn;
        }

        [HttpGet("getAllPaging")]
        public async Task<IActionResult> GetAllPaging([FromQuery]PagingParams pagingParams)
        {
            PagedList<BillIn> paged = await _billinRepository.GetAllPagingAsync(pagingParams);

            Response.AddPagination(paged.CurrentPage, paged.PageSize, paged.TotalCount, paged.TotalPages);

            return Ok(paged);
        }



        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] BillIn resource)
        {

            var result = await _billinRepository.SaveAsync(resource);


            return Ok(result);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _billinRepository.DeleteAsync(id);


            return Ok(result);
        }

        [HttpDelete("DeleteWithName")]
        public async Task<IActionResult> DeleteWithName([FromBody] BillIn resource)
        {
            var result = await _billinRepository.DeleteWithName(resource.Tenvtnhap);


            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] BillIn resource)
        {

            var result = await _billinRepository.UpdateAsync(id, resource);


            return Ok(result);
        }
    }
}
