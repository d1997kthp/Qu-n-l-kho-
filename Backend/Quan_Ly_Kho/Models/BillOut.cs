using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Models
{
    public class BillOut
    {
        public int Id { get; set; }
        public string Tenvtxuat { get; set; }
        public DateTime Ngayxuat { get; set; }
        public int Soluongxuat { get; set; }
        public int Dongiaxuat { get; set; }
        public string Tinhtrang { get; set; }
    }
}
