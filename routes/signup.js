const express = require('express');
const router = express.Router();
const {User,validateUser}= require('../model/users');
const bcrypt = require('bcrypt');
const _ = require('lodash');

/*Route handler for /signup */
router.get("/",(req,res)=>{
   
    if (req.session.user) {
        res.render('nav');
    }
    else{ 
        res.render("signup");}

});

/* SIGNUP USER. */
router.post('/', async (req, res) =>{
    const validation = validateUser().validate(req.body); 
    if (validation.error) 
        return res.status(400).send(validation.error.details[0].message);
    let user = await User.findOne({ email: req.body.email })

    if(user)
        return res.status(400).send('User already registered');
    else
    {
        user = new User(_.pick(req.body, ['firstname', 'lastname', 'birthday','email','password','marital_status']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.render('login');
    }
});

module.exports = router;

