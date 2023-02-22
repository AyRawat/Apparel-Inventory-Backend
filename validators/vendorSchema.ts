import * as yup from 'yup';

enum SizeEnum{
    S = 'S',
    M = 'M',
    L = 'L'
}

export const orderSchema = yup.object({
    apparelId: yup.string().trim(),
    quantity: yup.number(),
    price: yup.number(),
    size: yup.string().oneOf([SizeEnum.S, SizeEnum.M,SizeEnum.L]),
    description: yup.string().optional().trim(),
    collection: yup.string().optional().trim() 
}).required();

 const ArrayOfOrderSchema = yup.array().of(orderSchema);

 export const bulkOrderSchema = yup.lazy((value)=>{
    if(Array.isArray(value)){
        return ArrayOfOrderSchema;
    }
    return orderSchema;
 })