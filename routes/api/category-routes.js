const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
const categories = await Category.findAll({
  include:[{model:Product}]
});
res.status(200).json(categories);
} catch (err) {
  res.status(500).json(err);
}

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const catById = await Category.findByPk(req.params.id, {
      include:[{model:Product}],
    });
    if (!catById){
      res.status(404).json({message:"No category with this ID"});
      return;
    }
    res.status(200).json(catById);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {const cat = await Category.create(req.body);
  res.status(200).json(cat);}
  catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  Category.update(req.body, { 
    where: {
      id: req.params.id,
    },
  })
    .then((newCategory) => {
      
     res.json(newCategory)
    })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  /*
try{
  const delCat = await Category.destroy({
    where:{
      id:req.params.id,
    },
  });
  if(!delCat){
    res.status(404).json({message:"No category with this is"});
    return;
  }
  res.status(200).json(delCat);
} catch(err){
  res.status(500).json(err);
}
*/
Category.destroy({
  where:{
    id:req.params.id,
  },
}).then((cat) => {
  res.json(cat)
});

});

module.exports = router;
