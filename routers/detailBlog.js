const router = require('express').Router();
const DetailBlog = require('../services/detailBlog');

router.get('/:id', async function(req, res){
    try {
      let data = await  DetailBlog.getById(req.params.id)
      if(data){
          return res.status(200).json({
            status: 200, 
            message: 'thanh cong',
            data: data
          })

      }
      return res.status(400).json({
        status: 200, 
        message: 'Sai Id'
      })
    } catch (error) {
        return res.status(500).json({
            status: 500, 
            message: 'Loi server'
        })
    }
})

  
module.exports = router