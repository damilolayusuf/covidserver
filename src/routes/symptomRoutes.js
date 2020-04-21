const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth')

const Symptom = mongoose.model('Symptoms');
const User = mongoose.model('User');

const router = express.Router();

router.use(requireAuth);

router.post('/email', async(req,res)=>{
  
    const email = req.body
    try {
        const id = await User.find({email: req.body.email});
        res.send(id)
        //console.log(id)
    }catch (err){
        res.status(422).send({error:"Cant post Email"});
    }
    
    //console.log(id)
});


router.post('/friendsymp', async(req,res)=>{
   // console.log(req)
    const id = req.body
    try{
        const symp = await Symptom.find({userId: req.body.id.friendID});
        res.send(symp)
        console.log(symp)
    }catch (err){
        res.status(422).send({error:"Cant post Friend Symptoms"});
    }
        
    
});

router.get('/symptoms', async(req,res)=>{
    try{
        const symptoms = await Symptom.find({userId: req.user._id});
        res.send(symptoms);
        console.log(res.symptoms)
    }catch(err){
        res.status(422).send({error:"Cant Get Symptoms"})
    }
    
    

    
});

router.post('/symptoms', async (req,res)=>{
    
    const { info, status, symptoms} = req.body;
   // console.log(req.body)
    

    if(!symptoms && !status && !name && !city && !age ){
        return res.status(422).send({error: 'You must provide the list of information'});
    }
    try {
        //const symptom = new Symptom({symptoms, status, name, city, age,userId:req.user._id});
       
        const symptom = new Symptom({info, status,symptoms,userId:req.user._id});
        await symptom.save();
        res.send(symptom);
    } catch (err){
        res.status(422).send({error:"Cant Post Symptoms"});
    }
    
})

module.exports = router;