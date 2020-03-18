using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Models
{
    public class Stock
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int InventoryId { get; set; }
        public Inventory Inventory { get; set; }
        public int UnitId { get; set; }
        public Unit Unit { get; set; }
        public int Soluong { get; set; }

    }
}
