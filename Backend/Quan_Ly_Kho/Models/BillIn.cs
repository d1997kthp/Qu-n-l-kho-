using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Models
{
    public class BillIn
    {
        public int Id { get; set; }
        public string Tenvtnhap  { get; set; }
        public DateTime Ngaynhap { get; set; }
        public int Soluongnhap { get; set; }
        public int Dongianhap  { get; set; }
        public string Tinhtrang { get; set; }
    }
}
