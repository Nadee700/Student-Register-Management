import JOI from 'joi-browser'



export const validateForm = ( data, schema ) => {
    const result = JOI.validate(data, schema, { abortEarly:false })
    if( !result.error ) return null

    const errors = {}

    for( let item of result.error.details ) errors[item.path[0]] = item.message

    return errors
}


export const validateProperty = (name, value, schema) => {
    const validateObj = { [name]: value }
    const schemaFiled = { [name]: schema[name] }
    const { error } = JOI.validate(validateObj, schemaFiled)
    return error ? error.details[0].message : null
}
