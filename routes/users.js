const express = require('express')
const app = express
const router = express.Router();
const Users = require('../models/Users');

//GET back all the posts
router.get('/', async (req, res) => {
    try {
        const posts =  await Users.find({name: "clinica"});
        res.json(posts);
        console.log(posts.count());
    } catch (error) {
        res.json({message: error})
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const auth = await Users.find({"login": req.body.login, "password": req.body.password}, {_id: 0, login: 1, name: 1, adm: 1});
        if (auth) {
            res.json(auth)
            console.log(auth);
        } else {
            res.json(false)
        }
        console.log(req.body);
        res.end()
    } catch (error) {
        res.json({message: error})
        console.log(req.body);
    }
} )

// //SPECIFIC post
// router.get('/:UserId', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.UserId);
//         res.json(post)
//     } catch (error) {
//         res.json({message: error})
//     }
// } )

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