﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Quan_Ly_Kho.Models;

namespace Quan_Ly_Kho.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20200317211534_firsttime")]
    partial class firsttime
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Quan_Ly_Kho.Models.BillIn", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Dongianhap")
                        .HasMaxLength(50);

                    b.Property<DateTime>("Ngaynhap")
                        .HasMaxLength(50);

                    b.Property<int>("Soluongnhap")
                        .HasMaxLength(50);

                    b.Property<string>("Tenvtnhap")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Tinhtrang")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("BillIns");
                });

            modelBuilder.Entity("Quan_Ly_Kho.Models.BillOut", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Dongiaxuat")
                        .HasMaxLength(50);

                    b.Property<DateTime>("Ngayxuat")
                        .HasMaxLength(50);

                    b.Property<int>("Soluongxuat")
                        .HasMaxLength(50);

                    b.Property<string>("Tenvtxuat")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Tinhtrang")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("BillOuts");
                });

            modelBuilder.Entity("Quan_Ly_Kho.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Diachi")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<int>("Sdt")
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Quan_Ly_Kho.Models.Inventory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("Quan_Ly_Kho.Models.Stock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("InventoryId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<int>("Soluong")
                        .HasMaxLength(100);

                    b.Property<int>("UnitId");

                    b.HasKey("Id");

                    b.HasIndex("InventoryId");

                    b.HasIndex("UnitId");

                    b.ToTable("Stocks");
                });

            modelBuilder.Entity("Quan_Ly_Kho.Models.Unit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Des")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("Quan_Ly_Kho.Models.Stock", b =>
                {
                    b.HasOne("Quan_Ly_Kho.Models.Inventory", "Inventory")
                        .WithMany("Stocks")
                        .HasForeignKey("InventoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Quan_Ly_Kho.Models.Unit", "Unit")
                        .WithMany("Stocks")
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
