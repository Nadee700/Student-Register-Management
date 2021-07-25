import JOI from 'joi-browser'

export const StudentSchema = {
    firstName:JOI.string()
        .required()
        .label('First Name'),
    lastName:JOI.string()
        .required()
        .label('Last Name'),
    phoneNo:JOI.number()
        .required()
        .label('Phone'),
    email:JOI.string()
        .required()
        .email()
        .label('Email'),
    nic:JOI.string()
        .required()
        .label('NIC'),
    address:JOI.string()
        .required()
        .label('Address'),
    dateOfBirth:JOI.allow(),
    avatar:JOI.allow()
    
   
}