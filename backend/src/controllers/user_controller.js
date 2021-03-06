import User from '../models/user_model.js';

const allUsers = (req, res) => {
  User.find({}, (err, data) => {
    if(err) {
      return res.status(400).json({error: 'não encontrado.'})
    }
    data.salt = undefined;
    data.hashed_password = undefined;
    res.json(data)
  })
}

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
      if (err || !user) {
          return res.status(400).json({
              error: 'User not found'
          });
      }
      req.profile = user;
      next();
  });
};

const singleUser = (req,res) => {
  return res.json(req.profile);
}

export {
  allUsers, userById, singleUser
}