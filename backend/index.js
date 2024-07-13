const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 4000;

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
    },
    votes:{
        type:Number,
        default:0,
    }
});

app.post('/submitdesign', async (req, res) => {
    let designs = await Design.find({});
    let id;
    if (designs.length > 0) {
        let last_design_array = designs.slice(-1);
        let last_design = last_design_array[0];
        id = last_design.id + 1;
    } else {
        id = 1;
    }
    const design = new Design({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        gender: req.body.gender,
        votes: 0,
    });
    await design.save();
    res.json({
        success: true,
        name: req.body.name,
    });
});

app.get('/getdesign', async (req, res) => {
    let designs = await Design.find({});
    res.json(designs);
});

const Users = mongoose.model('Users', {
    name : {
        type: String,
    },
    email:{
        type :String,
        unique:true,
    },
    password:{
        type: String,
    },
    cartData:{
        type :Object,
    },
    date:{
        type :Date,
        default :Date.now,
    }
});

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({email: req.body.email});
    if (check) {
        return res.status(400).json({success:false, errors:"exisiting user found with same email address"})
    }
    let  cart = {};
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password : req.body.password,
        cartData : cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true, token});
});

app.post('/login', async (req,res) => {
    let user = await Users.findOne({email: req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data,'secret_ecom');
            res.json({success: true, token});
        } else {
            res.json({success: false, errors: "Wrong Password"});
        }
    } else {
        res.json({success:false, errors:"Wrong Email Id"});
    }
});

app.post('/increasevotes', async (req, res) => {
    const { id } = req.body;
    try {
        const design = await Design.findById(id);
        if (!design) {
            return res.status(404).json({ success: false, message: 'Design not found' });
        }
        design.votes += 1;
        await design.save();
        res.json({ success: true, votes: design.votes });
    } catch (error) {
        console.error('Error increasing votes:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
