import Category from '../models/category_model.js';

const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if(err || !category) {
      return res.status(400).json({
        error: 'Esta categoria não existe.'
      })
    }
    req.category = category;
    next();
  })
}

const list = (req, res) => {
  return res.json(req.pet);
}

const create = (req, res) => {  
  const category = new Category(req.body);

  category.save((err, data) => {
    if(err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({data})
  })
};



export {
  categoryById, list, create, 
} 