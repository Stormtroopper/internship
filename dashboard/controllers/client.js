import Product  from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
export const getProducts=async(req,res)=>{
    try{
        const products=await Product.find();    
        const productswithStats=await Promise.all(
            products.map(async(product)=>{
                const stat=await ProductStat.find({
                    ProductId:product._id
                })
                return{
                    ...product._doc,
                    stat,
                
                }
            })
        )
        
    }catch(error){
        res.status(404).json({message:error.message});
    }
}