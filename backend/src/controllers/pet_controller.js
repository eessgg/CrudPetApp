import Pet from '../models/pet_model.js';
import _ from 'lodash';
import fs from 'fs';
import formidable from 'formidable';

const list = (req, res) => {
  Pet.find({}, (err, data) => {
    if(err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({data})
  })
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


export {
  list, create, 
} 