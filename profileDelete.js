router.post('/profileDelete', isValidToken, async (req,res) =>{
    try {
        const _id = mongoose.Types.ObjectId(req.body._id);
        const phoneNo = req.body.phoneNo;
        const get = await user.findOne({$or: [{_id: _id},{phoneNo: phoneNo}]}); 
        if(get)
        {
          await user.deleteOne({_id : _id});
          await sessionModel.deleteMany({userId : _id});
          await chatGptModel.deleteMany({phone_number : phoneNo});
          //console.log("Check <<||>> :",req.body);
            res.send({ status : 200, message : "Profile Delete Successfully.", statusCode : 200});
        }else{
            res.send({status : 400, message : "No Data Found.", statusCode : 400});
        }        
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "Something went wrong.", status: false, statusCode: 500 })
    }
})