using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Models
{
    public class Unit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Des { get; set; }
        public ICollection<Stock> Stocks { get; set; } = new List<Stock>();

    }
}
