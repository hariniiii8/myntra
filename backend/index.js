const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Express app is running");
});

const mongoURI = "mongodb+srv://hariniiii8:Pippi%401234@cluster0.gz7ejtw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('design'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const Design = mongoose.model("Design", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    gender:{
        type:String,
        required:true
    }
}
)

app.post('/submitdesign',async(req,res)=>{

    let designs=await Design.find({});
    let id;
    if(designs.length>0)
    {
        let last_design_array=designs.slice(-1);
        let last_design=last_design_array[0];
        id=last_design.id+1;
    }
    else{
        id:1;
    }
    const design=new Design({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        gender:req.body.gender,
    
        
    });
    console.log(design);
    await design.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
}
)





app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});