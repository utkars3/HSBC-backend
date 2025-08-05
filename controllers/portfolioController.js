

export const allItems=async (req,res)=>{
    try{
        const items=await portfolio.find({});
        res.status(200).json(items);
    }catch(error){
        res.status(500).json({message: "Error fetching items", error: error.message});
    }
}