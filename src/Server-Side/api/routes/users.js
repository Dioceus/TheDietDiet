const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../Database/middleware/auth')
const User = require('../../Database/models/UserModel');

/**
 * @route   POST /auth/register
 * @desc    Register user
 * @access  Public
 */


router.post('/register', (req, res) => {
  const { name, username, emailAddress, password, isHelper } = req.body;

  // Simple validation
  if (String(name).length === 0 || String(username).length === 0 || String(emailAddress).length === 0 || String(password).length === 0) { //|| !username || !emailAddress || !password
    return res.status(400).json({ msg: 'Please enter all fields' });
   }

   User.findOne({ emailAddress })
   .then(user => {
       if(user)
       {
        return res.status(400).json({ msg: 'User already exists' });
       }
       
       const newUser = new User({name, username, emailAddress, password, isHelper});

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      username: user.username,
                      emailAddress: user.emailAddress,
                      isHelper: user.isHelper
                    }
                  });
                }
              )
            });
        })
      })

    })
});

/**
 * @route   POST /auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', (req, res) => {
  
    const { emailAddress, password} = req.body;
  
    // Simple validation
     if( (String(emailAddress) === 0 || String(password) === 0) ) {
      return res.status(400).json({ msg: 'Please enter all fields' });
     }
  
     User.findOne({ emailAddress })
     .then(user => {
         if(!user) return res.status(400).json({ msg: 'User does not exist' });
  
        //Validating password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  emailAddress: user.emailAddress
                }
              });
            }
          )
        })
        
      })
  });

/**
 * @route   POST /auth/user
 * @desc    Get user data 
 * @access  Private 
 */

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
  });

module.exports = router;