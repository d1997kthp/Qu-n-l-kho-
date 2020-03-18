using Microsoft.EntityFrameworkCore;
using Quan_Ly_Kho.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quan_Ly_Kho.Models
{
    public class AppDbContext : DbContext
    {

        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<BillIn> BillIns { get; set; }
        public DbSet<BillOut> BillOuts { get; set; }



        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Inventory>().ToTable("Inventories");
            builder.Entity<Inventory>().HasKey(p => p.Id);
            builder.Entity<Inventory>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Inventory>().Property(p => p.Name).IsRequired().HasMaxLength(50);
            builder.Entity<Inventory>().HasMany(p => p.Stocks).WithOne(p => p.Inventory).HasForeignKey(p => p.InventoryId);

            builder.Entity<Stock>().ToTable("Stocks");
            builder.Entity<Stock>().HasKey(p => p.Id);
            builder.Entity<Stock>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Stock>().Property(p => p.Name).IsRequired().HasMaxLength(50);
            builder.Entity<Stock>().Property(p => p.Soluong).IsRequired().HasMaxLength(100);


            builder.Entity<Unit>().ToTable("Units");
            builder.Entity<Unit>().HasKey(p => p.Id);
            builder.Entity<Unit>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Unit>().Property(p => p.Name).IsRequired().HasMaxLength(50);
            builder.Entity<Unit>().Property(p => p.Des).IsRequired().HasMaxLength(50);
            builder.Entity<Unit>().HasMany(p => p.Stocks).WithOne(p => p.Unit).HasForeignKey(p => p.UnitId);

            builder.Entity<Customer>().ToTable("Customers");
            builder.Entity<Customer>().HasKey(p => p.Id);
            builder.Entity<Customer>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Customer>().Property(p => p.Name).IsRequired().HasMaxLength(30);
            builder.Entity<Customer>().Property(p => p.Diachi).IsRequired().HasMaxLength(50);
            builder.Entity<Customer>().Property(p => p.Sdt).IsRequired().HasMaxLength(30);

            builder.Entity<BillIn>().ToTable("BillIns");
            builder.Entity<BillIn>().HasKey(p => p.Id);
            builder.Entity<BillIn>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<BillIn>().Property(p => p.Tenvtnhap).IsRequired().HasMaxLength(50);
            builder.Entity<BillIn>().Property(p => p.Ngaynhap).IsRequired().HasMaxLength(50);
            builder.Entity<BillIn>().Property(p => p.Soluongnhap).IsRequired().HasMaxLength(50);
            builder.Entity<BillIn>().Property(p => p.Dongianhap).IsRequired().HasMaxLength(50);
            builder.Entity<BillIn>().Property(p => p.Tinhtrang).IsRequired().HasMaxLength(50);

            builder.Entity<BillOut>().ToTable("BillOuts");
            builder.Entity<BillOut>().HasKey(p => p.Id);
            builder.Entity<BillOut>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<BillOut>().Property(p => p.Tenvtxuat).IsRequired().HasMaxLength(50);
            builder.Entity<BillOut>().Property(p => p.Ngayxuat).IsRequired().HasMaxLength(50);
            builder.Entity<BillOut>().Property(p => p.Soluongxuat).IsRequired().HasMaxLength(50);
            builder.Entity<BillOut>().Property(p => p.Dongiaxuat).IsRequired().HasMaxLength(50);
            builder.Entity<BillOut>().Property(p => p.Tinhtrang).IsRequired().HasMaxLength(50);
        }
    }
}
