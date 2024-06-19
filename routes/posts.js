/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get a list of contact posts
 *     description: Retrieve a list of posts from the database
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               posts: [{ id: 1, title: 'Sample Post' }]
 *
 *   post:
 *     summary: Create a new post
 *     description: Submit a new post to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               favoriteColor:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - dateOfBirth
 *               - favoriteColor
 *               - email
 *     responses:
 *       200:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               name: Idem Effanga
 *               dateOfBirth: '2000-07-07'
 *               favoriteColor: Blue
 *               email: Idem@example.com
 *
 * /posts/{postId}:
 *   get:
 *     summary: Get a specific post by ID
 *     description: Retrieve a post from the database by its ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Sample Post
 *               dateOfBirth: '2000-01-01'
 *               favoriteColor: Red
 *               email: sample@example.com
 *
 *   patch:
 *     summary: Update a specific post by ID
 *     description: Update a post in the database by its ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               favoriteColor:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - dateOfBirth
 *               - favoriteColor
 *               - email
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Updated Post
 *               dateOfBirth: '2000-01-01'
 *               favoriteColor: Blue
 *               email: updated@example.com
 *
 *   delete:
 *     summary: Delete a specific post by ID
 *     description: Delete a post from the database by its ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found or already deleted
 */



const express = require('express');

const router = express.Router();
const Post = require('../models/Post');


//Gets all the post
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});


//Submits a post
router.post('/', (req, res) => {
    //console.log(req.body);
    const post = new Post({
        // title: req.body.title,
        // description: req.body.description
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        favoriteColor: req.body.favoriteColor,
        email: req.body.email
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message: err});
        });
});

//Gets a specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});

//Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        
        // Check if a post was actually removed
        if (removedPost.deletedCount === 1) {
            res.json({ message: 'Post deleted successfully' });
        } else {
            res.json({ message: 'Post not found or already deleted' });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Update a post
// router.patch('/:postId', async (req, res) => {
//     try{
//         const updatedPost = await Post.updateOne(
//             {_id: req.params.postId},
//             {$set: {name:req.body.name}}
//         );
//         res.json(updatedPost);
//     }catch (err) {
//         res.json({message: err});
//     }
// });
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    name: req.body.name,
                    dateOfBirth: req.body.dateOfBirth,
                    favoriteColor: req.body.favoriteColor,
                    email: req.body.email,
                    pet: req.body.pet
                }
            }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err.message });
    }
});




module.exports = router;