import * as yup from 'yup';

enum SizeEnum{
    S = 'S',
    M = 'M',
    L = 'L'
}

const userOrderFulfillmentSchema = yup.object({
    apparelId: yup.string().trim(),
    quantity: yup.number(),
    size: yup.string().oneOf([SizeEnum.S, SizeEnum.M,SizeEnum.L]),
}).required();

const ArrayOfUserSchema = yup.array().of(userOrderFulfillmentSchema);

export const userOrderSchema = yup.lazy((value)=>{
   if(Array.isArray(value)){
       return ArrayOfUserSchema;
   }
   return userOrderFulfillmentSchema;
})