/**
 * - [Logout](/logout)
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects from the database.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               projects: [{ id: 1, name: 'Sample Project' }]
 *
 *   post:
 *     summary: Create a new project
 *     description: Submit a new project to the database.
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
 *                 example: "DD-MM-YYYY"
 *               favoriteColor:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               student:
 *                 type: string
 *               working:
 *                 type: string
 *               hobbies:
 *                 type: string
 *             required:
 *               - name
 *               - dateOfBirth
 *               - favoriteColor
 *               - email
 *               - gender
 *               - student
 *               - working
 *               - hobbies
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               name: Idem Effanga
 *               dateOfBirth: '2000-07-07'
 *               favoriteColor: Blue
 *               email: Idem@example.com
 *               gender: Male
 *               student: Yes
 *               working: Yes
 *               hobbies: Coding
 *
 * /projects/{projectId}:
 *   get:
 *     summary: Get a specific project by ID
 *     description: Retrieve a project from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: projectId
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
 *               name: Sample Project
 *               dateOfBirth: '2000-01-01'
 *               favoriteColor: Red
 *               email: sample@example.com
 *               gender: Female
 *               student: No
 *               working: Yes
 *               hobbies: Reading
 *
 *   patch:
 *     summary: Update a specific project by ID
 *     description: Update a project in the database by its ID.
 *     parameters:
 *       - in: path
 *         name: projectId
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
 *                 example: "DD-MM-YYYY"
 *               favoriteColor:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               student:
 *                 type: string
 *               working:
 *                 type: string
 *               hobbies:
 *                 type: string
 *             required:
 *               - name
 *               - dateOfBirth
 *               - favoriteColor
 *               - email
 *               - gender
 *               - student
 *               - working
 *               - hobbies
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Updated Project
 *               dateOfBirth: '2000-01-01'
 *               favoriteColor: Blue
 *               email: updated@example.com
 *               gender: Male
 *               student: Yes
 *               working: No
 *               hobbies: Traveling
 *
 *   delete:
 *     summary: Delete a specific project by ID
 *     description: Delete a project from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found or already deleted
 */

const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); 
const { body, validationResult } = require('express-validator');
const moment = require('moment');

// Data validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Logout route
router.get('/logout', (req, res) => {
    // Implement your logout logic here
    res.send('Logged out successfully');
});

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new project
router.post(
    '/', 
    [
        // validate request body fields
        body('name').isString().notEmpty(),
        body('dateOfBirth').custom((value) => {
            if (!moment(value, 'DD-MM-YYYY').isValid()) {
                throw new Error('Invalid date format for dateOfBirth. Please provide the date in DD-MM-YYYY format.');
            }
            return true;
        }),
        body('favoriteColor').isString().notEmpty(),
        body('email').isEmail(),
        body('gender').isString().notEmpty(),
        body('student').isString().notEmpty(),
        body('working').isString().notEmpty(),
        body('hobbies').isString().notEmpty(),
        validate, // middleware for data validation
    ],
    async (req, res) => {
        const project = new Project({
            name: req.body.name,
            dateOfBirth: moment(req.body.dateOfBirth, 'DD-MM-YYYY').toDate(),
            favoriteColor: req.body.favoriteColor,
            email: req.body.email,
            gender: req.body.gender,
            student: req.body.student,
            working: req.body.working,
            hobbies: req.body.hobbies
        });

        try {
            const newProject = await project.save();
            res.status(201).json(newProject);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Get a specific project by ID
router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a project by ID
router.patch(
    '/:projectId',
    // [
    //     // Validate request body fields
    //     body('name').isString().notEmpty(),
    //     body('dateOfBirth').isDate(),
    //     body('favoriteColor').isString().notEmpty(),
    //     body('email').isEmail(),
    //     body('gender').isString().notEmpty(),
    //     body('student').isString().notEmpty(),
    //     body('working').isString().notEmpty(),
    //     body('hobbies').isString().notEmpty(),
    //     validate, // Middleware for data validation
    // ], 
    async (req, res) => {
        try {
            const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });
            if (!updatedProject) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.json(updatedProject);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Delete a project by ID
router.delete('/:projectId', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
