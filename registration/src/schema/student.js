import JOI from 'joi-browser'

export const StudentSchema = {
    firstName:JOI.string()
        .required()
        .label('First Name'),
    lastName:JOI.string()
        .required()
        .label('Last Name'),
    phoneNo:JOI.string()
        .required()
        .regex(/^[0-9]{10}$/)
        .error(() => {
            return {
                message: 'Phone no is required and should be 10 digits',
            };
        })
        .label('Phone'),
    email:JOI.string()
        .required()
        .email()
        .label('Email'),
    nic:JOI.string()
        .required()
        .regex(/^[0-9]{12}$/)
        .error(() => {
            return {
                message: 'NIC is required and should be 12 digits',
            };
        })
        .label('NIC'),
    address:JOI.string()
        .required()
        .label('Address'),
    dateOfBirth:JOI.date()
        .required()
        .label('Date of Birth'),
    avatar:JOI.allow()
    
   
}