const express = require('express')
const app = express
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Datas = require('../models/Datas')
var conn = mongoose.connection;

//GET back all the posts
// function callsByPeople(params) {
//     for 
// }

router.get('/', async (req, res) => {
    // try {
        // const base =  await Post.find('users', {}).sort('profissionalProcurado');
        const marcou =  await Post.find({houveMarcacao: {$regex: /sim/i}}).count();
        const wpp = await Post.find({meio: {$regex: /whatsapp/i}}).count();
        res.json({ marcou, wpp});
    // } catch (error) {
    //     res.json({message: error})
    // }
});

router.post('/collections', async (req, res) => {
    
    try {
        console.log(req.body);
        const reqUser = req.body
        const names = await conn.db.listCollections().toArray()
        const collections = names.map(col => col.name)
        if (reqUser.adm) {
            res.json({collections: collections})
        } else {
            const user = collections.filter(item => { return item.match(reqUser.name)})
            res.json({collections: user})
        }
        res.end()
    } catch (error) {
        res.json(error)
    }
})

router.post('/collections/datas', async (req, res) => {
    const reqCollection = req.body.collection
    
    try {
        
        const collectionsData = await conn.db.collection(reqCollection).find({}).toArray()
        res.json(collectionsData)
    }
    catch (error) {
        res.json(error)
    }
})
// router.get('/collection/:collectionName', async (req, res) => {
//     try {
//         const collection = await Post.find()
//     } catch (error) {
        
//     }
// })

router.post('/login', async (req, res) => {

})

router.get('/marcou', async (req, res) => {
    try {
        const datas = await Datas.findOne({},{ data1: 1, data2: 1, _id: 0})
        const contatos = await Post.find().count();
        let code = [{primeiraVez: "Sim"},{houveMarcacao: "Sim"}]
        const n_marcou = await Post.find({data1 : data2}).count();
        const novos = await Post.find(code[0]).count();
        res.json([{"marcados": n_marcou, "contatos": contatos, "novos": novos}, datas]);
        res.end()
    } catch (error) {
        res.json({message: error})
    }
});

//SPECIFIC post
router.get('/login', async (req, res) => {
    try {
        const post = await Post.findById({login: req.body.login, password: req.body.password});
        res.json(post)
    } catch (error) {
        res.json({message: error})
    }
} )

// //Remove the post
// router.delete('/:postId', async (req, res) => {
//     try {
//         const removedPost = await Post.remove({_id: req.params.postId })
//         res.json(removedPost)
//     } catch (error) {
//         res.json(error)
//     }
// })

// //SUBMIT the post
// router.post('/', async (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });

//     try {
//         const savedPost = await post.save();
//         res.json(savedPost)
//     }catch(err) {
//         res.json({message: err})
//     }
// })

// //Update a post
// router.patch('/:postId', async(req, res) => {
//     try {
//         const updatedPost = await Post.updateOne(
//             {_id: req.params.postId},
//             {$set: {title: req.body.title}}
//         )
//         res.json(updatedPost)
//     } catch (error) {
//         res.json(error)
//     }
// })
module.exports = router;