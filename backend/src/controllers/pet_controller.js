import Pet from '../models/pet_model.js';
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';

const petById = (req, res, next, id) => {
  Pet.findById(id).exec((err, pet) => {
    if(err || !pet) {
      return res.status(400).json({
        error: 'Pet não encontrado.'
      })
    }
    req.pet = pet;
    next();
  })
}

const listAll = (req, res) => {
  Pet.find().select('-photo').exec((err, pets) => {
      if (err) {
          return res.status(400).json({
              error: 'pets not found'
          });
      }
      console.log(pets)
      res.json(pets);
  });
}

const single = (req, res) => {
  req.pet.photo = undefined;
  return res.json(req.pet)
}

const create = (req, res) => {  
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
      if (err) {
          return res.status(400).json({
              error: 'Image could not be uploaded'
          });
      }
      // all fields
      const { name, size, category, adopted } = fields;

      if (!name || !size || !adopted || !category) {
          return res.status(400).json({
              error: 'All fields are required'
          });
      }

      let pet = new Pet(fields);

      // 1kb = 1000
      // 1mb = 1000000

      if (files.photo) {
          // console.log("FILES PHOTO: ", files.photo);
          if (files.photo.size > 1000000) {
              return res.status(400).json({
                  error: 'Image should be less than 1mb in size'
              });
          }
          pet.photo.data = fs.readFileSync(files.photo.path);
          pet.photo.contentType = files.photo.type;
      }

      pet.save((err, result) => {
          if (err) {
              console.log('pet CREATE ERROR ', err);
              return res.status(400).json({
                  error: err
              });
          }
          res.json(result);
      });
  });
};


const update = (req, res) => {  
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
      if (err) {
          return res.status(400).json({
              error: 'Image could not be uploaded'
          });
      }
      // all fields
      const { name, size, category, adopted } = fields;

      if (!name || !size || !adopted || !category) {
          return res.status(400).json({
              error: 'All fields are required'
          });
      }

      let pet = req.pet;
      pet = _.extend(pet, fields)

      if (files.photo) {
          // console.log("FILES PHOTO: ", files.photo);
          if (files.photo.size > 1000000) {
              return res.status(400).json({
                  error: 'Image should be less than 1mb in size'
              });
          }
          pet.photo.data = fs.readFileSync(files.photo.path);
          pet.photo.contentType = files.photo.type;
      }

      pet.save((err, result) => {
          if (err) {
              console.log('pet CREATE ERROR ', err);
              return res.status(400).json({
                  error: err
              });
          }
          res.json(result);
      });
  });
};

const remove = (req, res) => {
  // res.send('ok')
  let pet = req.pet;
  pet.remove((err, deletedPet) => {
    if (err) {
      console.log('pet CREATE ERROR ', err);
      return res.status(400).json({
          error: err
      });
    }
    res.json({deletedPet, message: 'Pet deletado.'});
  })

}

export {
  listAll, create, petById, update, single, remove
} 