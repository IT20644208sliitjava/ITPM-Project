const router = require("express").Router();
let Module = require("../models/Model_modules");

router.route("/addModule").post((req, res) =>{

    const number = Number(req.body.number);
    const name = req.body.name;
    const code = req.body.code;
    const tmark = Number(req.body.tmark);
    const Datet = req.body.Datet;
    const uploader = req.body.uploader;

    const newModule = new Module({number, name, code, tmark, Datet, uploader});

    newModule.save().then(()=>{res.json("Module Added")

        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Adding Data",error: err.message});
        });
});

router.route("/getAllData").get((req,res) => {
    Module.find().then((modules) => {res.json(modules)
    }).catch((err) => {console.log(err)
    })
});

router.route("/updateModule/:id").put(async(req,res)=>{
    let mId = req.params.id;
    const { name, tmark , Datet , uploader} = req.body;

    const updateModule = { name, tmark , Datet , uploader}
    
    const update = await Module.findByIdAndUpdate(mId, updateModule).then(()=>{res.status(200).send({status: "User Updated"})
    }).catch((err) => {
        console.log(err)
        res.status(500).send({status: "Error with Updating Data", error: err.message});

    })
})

router.route("/delete/:id").delete(async(req, res) => {
        let mId = req.params.id;

        await Module.findByIdAndDelete(mId)
        .then(()=>{
            res.status(200).send({status: "Module Deleted"})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with delete user",error:err.message});
        })
});

router.route('/searchData/:text').get((req, res) => {
    const searchText = req.params.text;
  
    // Construct the search query using the $regex operator with a case-insensitive flag
    const searchQuery = { name: { $regex: searchText, $options: 'i' } };
  
    // Search the MongoDB collection for the matching data
    Module.find(searchQuery, (err, data) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ data: data });
      }
    });
});
    
module.exports = router;