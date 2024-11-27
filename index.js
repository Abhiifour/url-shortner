const express = require("express");
const {nanoid} = require("nanoid");
const dbConnect = require('./dbConnect')

const Url = require("./url")

const app = express();
app.use(express.json());

// MiddleWares 

const counter = async(req,res,next) =>{
    const shortId = req.params.shortId;
    
        const url = await Url.findOne({shortId});
        if(url){
        
        url.clicks += 1;
        url.lastAccessed = new Date()
        await url.save();
        }
        else{
        return res.status(400).json({
            msg:"ShortId does not exists"
        })
    }
   
    next();
}

const check = async(req,res,next) =>{
    const shortId = req.params.shortId;
    try {
        const url = await Url.findOne({shortId});
        if(!url){
        return res.json({
            msg : "ShortId does not exists"
        })
        
    }
    
    } catch (error) {
        console.log(error)
    }
    next()
}


// Routes 

app.get("/:shortId",check,counter,async (req,res)=>{
    const shortId = req.params.shortId;
    const url = await Url.findOne({shortId});
    return res.redirect(
            url.originalUrl
        )
    }    
)

app.post("/shorten", async (req,res)=>{
    const originalUrl = req.body.url;
    const shortId = nanoid(7);
    try {
    const dummyUrl = await Url.findOne({originalUrl});
    if(dummyUrl){
        return res.status(400).json({
            msg:"Url already exist"
        })
    }
    const url = await Url.create({ originalUrl, shortId });
    return res.status(201).json(url.shortId);
    } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
    
})


app.get("/stats/:shortId",check, async (req,res)=>{
    const shortId = req.params.shortId;
   
    const url = await Url.findOne({shortId});
  
    return res.status(200).json({
        originalUrl : url.originalUrl,
        shortId : url.shortId,
        clicks : url.clicks,
        lastAccessed: url.lastAccessed

    })
    }
  
)

// Database connection established.

dbConnect();


//Port
app.listen(3000,()=>{
    
    console.log("listening on port 3000")
})