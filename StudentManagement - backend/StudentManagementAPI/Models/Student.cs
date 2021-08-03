using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagementAPI.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public string NIC { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }

     


    }
}
