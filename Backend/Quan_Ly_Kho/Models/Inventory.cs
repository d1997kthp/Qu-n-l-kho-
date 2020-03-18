using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<Stock> Stocks { get; set; } = new List<Stock>();
    }
}
