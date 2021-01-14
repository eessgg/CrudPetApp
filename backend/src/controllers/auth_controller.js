import User from '../models/user_model.js';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const getAll = (req, res) => {
  User.find({}, (err, data) => {
    if(err) {
      return res.status(400).json({error: 'não encontrado.'})
    }
    res.json(data)
  })
}

const register = async (req, res) => {
  try {
    let {name, email, password} = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({
        message: "Preencha todos os campos."
      }) 
    }

    const existentUser = await User.findOne({email})

    if(existentUser) {
      return res.status(400).json({
        message: "Email já registrado."
      }) 
    }

    // create user 
    const newUser = new User({name, email, password})
    newUser.save((err, data) => {
      if(err) {
        return res.status(400).json({
          message: err
        })    
      }
      data.salt = undefined;
      data.hashed_password = undefined;
      res.json({data})
    })
    
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
}

const login = (req, res) => {
  const { email, password } = req.body
  User.findOne({email}, (err, user) => {

    if(err || !user) {
      return res.status(400).json({
        error: 'Usuário não existe.'
      })
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
          error: 'Email and password dont match'
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('t', token, { expire: new Date() + 9999 });
    const { _id, name, email, permissionLevel } = user;
    return res.json({ token, user: { _id, email, name, permissionLevel } });
  })
}


function requireSignin() {
  return expressJwt({
    secret: secretKey.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });
}


const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
      return res.status(403).json({
          error: 'Access denied'
      });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
      return res.status(403).json({
          error: 'Admin resourse! Access denied'
      });
  }
  if(!user.authenticate(password))
  next();
};

export {
  register, login, requireSignin, isAuth, isAdmin, getAll
}
