using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagementAPI.Models
{
    public class StudentDbContext : DbContext
    {
         
        public DbSet<Student> Student { get; set; }


        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().ToTable("StudentTable");
        }
    }
}

