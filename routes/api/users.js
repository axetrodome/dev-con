const express = require('express');
const router  = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
// router.get('/', (req, res) => res.send('User route'));

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter an email').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 })
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{msg: 'User already exists'}] })
        }

        //add avatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        //insert user
        user = new User({
            name,
            email,
            avatar,
            password
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // sign the user in
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 1408621000 },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server error');
    }
});


module.exports = router;
