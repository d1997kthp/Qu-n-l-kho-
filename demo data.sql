USE [Quan_ly_kho1]
GO
SET IDENTITY_INSERT [dbo].[Inventories] ON 

INSERT [dbo].[Inventories] ([Id], [Name]) VALUES (1, N'Đồ gia dụng')
INSERT [dbo].[Inventories] ([Id], [Name]) VALUES (2, N'Thực phẩm')
INSERT [dbo].[Inventories] ([Id], [Name]) VALUES (3, N'Điện Tử')
INSERT [dbo].[Inventories] ([Id], [Name]) VALUES (4, N'Công nghệ')
INSERT [dbo].[Inventories] ([Id], [Name]) VALUES (5, N'Linh kiện')
SET IDENTITY_INSERT [dbo].[Inventories] OFF
SET IDENTITY_INSERT [dbo].[Units] ON 

INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (1, N'Mét', N'Đơn vị đo đọ dài')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (2, N'Milimet', N'Đơn vị đo độ dài')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (3, N'Kilôgam', N'Đơn vị đo cân nặng')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (4, N'Tạ', N'Đơn vị đo cân nặng')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (5, N'Yến', N'Đơn vị đo cân nặng')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (6, N'Héc-ta', N'Đơn vị đo diện tích')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (7, N'Chiếc', N'Đơn vị đo số lượng')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (8, N'Đôi', N'Đơn vị đo số lượng')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (9, N'Chục', N'Đơn vị đo số lượng')
INSERT [dbo].[Units] ([Id], [Name], [Des]) VALUES (10, N'Tấn', N'Đơn vị đo cân nặng')
SET IDENTITY_INSERT [dbo].[Units] OFF
SET IDENTITY_INSERT [dbo].[Stocks] ON 

INSERT [dbo].[Stocks] ([Id], [Name], [InventoryId], [UnitId], [Soluong]) VALUES (1, N'Vải', 1, 1, 0)
INSERT [dbo].[Stocks] ([Id], [Name], [InventoryId], [UnitId], [Soluong]) VALUES (2, N'Dây thép', 1, 1, 20)
INSERT [dbo].[Stocks] ([Id], [Name], [InventoryId], [UnitId], [Soluong]) VALUES (3, N'Cặp', 1, 7, 1)
INSERT [dbo].[Stocks] ([Id], [Name], [InventoryId], [UnitId], [Soluong]) VALUES (4, N'Tai nghe', 1, 7, 2)
INSERT [dbo].[Stocks] ([Id], [Name], [InventoryId], [UnitId], [Soluong]) VALUES (5, N'Chuột có dây', 1, 7, 123)
INSERT [dbo].[Stocks] ([Id], [Name], [InventoryId], [UnitId], [Soluong]) VALUES (6, N'Điện thoại', 1, 8, 1)
SET IDENTITY_INSERT [dbo].[Stocks] OFF
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200317211534_firsttime', N'2.1.11-servicing-32099')
SET IDENTITY_INSERT [dbo].[BillIns] ON 

INSERT [dbo].[BillIns] ([Id], [Tenvtnhap], [Ngaynhap], [Soluongnhap], [Dongianhap], [Tinhtrang]) VALUES (2, N'Cá', CAST(N'2019-11-18 00:00:00.0000000' AS DateTime2), 12, 100000, N'Đã thanh toán')
INSERT [dbo].[BillIns] ([Id], [Tenvtnhap], [Ngaynhap], [Soluongnhap], [Dongianhap], [Tinhtrang]) VALUES (3, N'Bò', CAST(N'2020-03-05 00:00:00.0000000' AS DateTime2), 12, 10000, N'Chưa thanh toán')
SET IDENTITY_INSERT [dbo].[BillIns] OFF
SET IDENTITY_INSERT [dbo].[BillOuts] ON 

INSERT [dbo].[BillOuts] ([Id], [Tenvtxuat], [Ngayxuat], [Soluongxuat], [Dongiaxuat], [Tinhtrang]) VALUES (1, N'Cá', CAST(N'2020-12-12 00:00:00.0000000' AS DateTime2), 12, 12, N'12')
INSERT [dbo].[BillOuts] ([Id], [Tenvtxuat], [Ngayxuat], [Soluongxuat], [Dongiaxuat], [Tinhtrang]) VALUES (3, N'cá', CAST(N'2020-03-17 00:00:00.0000000' AS DateTime2), 12, 12, N'Đã thanh toán')
INSERT [dbo].[BillOuts] ([Id], [Tenvtxuat], [Ngayxuat], [Soluongxuat], [Dongiaxuat], [Tinhtrang]) VALUES (4, N'Bò', CAST(N'2020-03-12 00:00:00.0000000' AS DateTime2), 12, 133123, N'Chưa thanh toán')
SET IDENTITY_INSERT [dbo].[BillOuts] OFF
SET IDENTITY_INSERT [dbo].[Customers] ON 

INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (1, N'Simple', N'Mát cơ va', 913139194)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (2, N'Electronic', N'Mát cơ va', 981276180)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (3, N'Perfector', N'Mát cơ va', 954562564)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (4, N'Dev1ce', N'Chưa rõ', 1234132132)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (5, N'Lê văn luyện', N'Cao bằng', 231412341)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (6, N'Trần văn c', N'Hà nội', 988119238)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (7, N'Đỗ văn a', N'Hà nội', 1231231412)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (8, N'Nguyễn Thị B', N'Hà nội', 98172323)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (9, N'Trần Văn Trọc', N'Hà nội', 981123123)
INSERT [dbo].[Customers] ([Id], [Name], [Diachi], [Sdt]) VALUES (10, N'Lê Đức T', N'Hà nội', 982131231)
SET IDENTITY_INSERT [dbo].[Customers] OFF
