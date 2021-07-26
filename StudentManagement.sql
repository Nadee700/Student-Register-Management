USE [StudentManagementDB]
GO
/****** Object:  Table [dbo].[StudentTable]   Script Date: 7/22/2021 10:55:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentTable](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](255) NOT NULL,
	[LastName] [nvarchar](255) NOT NULL,
	[PhoneNo] [int] NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[NIC] [nvarchar](255) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
	[Address] [nvarchar](255) NOT NULL,
	[Avatar] [varchar](max) NULL,
 CONSTRAINT [PK_sId] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT INTO [dbo].[StudentTable]
           ([FirstName]
           ,[LastName]
           ,[PhoneNo]
		   ,[Email]
		   ,[NIC]
		   ,[DateOfBirth]
		   ,[Address]
		   ,[Avatar]
		   )
     VALUES
           ('John'
           ,'Steav'
           ,'0772346780'
           ,'john.s@gmail.com'
		   ,'9436728956V'
		   ,'1994-01-27'
		   ,'117 Chapel Close, Queensland'
		   ,'')
GO
INSERT INTO [dbo].[StudentTable]
           ([FirstName]
           ,[LastName]
           ,[PhoneNo]
		   ,[Email]
		   ,[NIC]
		   ,[DateOfBirth]
		   ,[Address]
		   ,[Avatar]
		   )
     VALUES
           ('Alex'
		   ,'nikola'
		   ,'0713700763'
		   ,'alex.n@gmail.com'
		   ,'9539028956V'
		   ,'1995-05-17'
		   ,'No 567, kansas street, USA'
		   ,'')
GO



