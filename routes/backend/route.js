const {body} = require('express-validator')
const express = require("express");
const outController = require("../../controllers/backend/outController");
const dashController = require("../../controllers/backend/dashController");
const userController = require("../../controllers/backend/userController");
const deptController = require("../../controllers/backend/deptController");
const lecturerController = require("../../controllers/backend/lecturerController");


const homeRouter = express.Router();

/** User router */

// homeRouter.use(function (req, res,
//                          next) {
//     const session = req.session;
//     console.log(session.uId)
//     const currentUrl = req.originalUrl;
//     const err = new Error('Invalid user ID:')
//     if (currentUrl !== '/backend/login' && currentUrl !== '/backend') {
//
//         if (session.uId !== undefined) {
//             return next()
//         }
//         const urlValue = Object.values(req.query).toString()
//
//         let pass, mail = "";
//         if (urlValue === 'password')
//             pass = urlValue
//         if (urlValue === 'email')
//             mail = urlValue
//
//         res.render('backend/login.ejs', {
//             title: 'Log_In test',
//             layout: 'layouts/auth.ejs',
//             pass, mail
//         })
//     }else return next()
//
//
// })


homeRouter.post('/users/changepassword', body('oldpass')
    .isLength({min: 5}), body('newpass')
    .isLength({min: 5}), body('repass')
    .custom((value, {req}) => {
        if (value !== req.body.newpass) {
            throw  new Error('Password confirmation does not match password!')
        }
        return true;
    }), userController.changePass);


homeRouter.post('/users/delete',
    body('id').isInt(), userController.deleteUsers)

homeRouter.post('/users/update',
    body('email').isEmail(),
    body('name').isLength({min: 3}),
    body('id').isInt(),
    userController.update);


homeRouter.post('/users/create', body('email').isEmail(), body('name')
    .isLength({min: 5}), userController.create)

homeRouter.get('/users/edit/:id', userController.editUsers)

homeRouter.get('/users/create', userController.doCreate);

homeRouter.get('/users', userController.getUsers);

homeRouter.get('/dashboard/:id', dashController.index)

homeRouter.post('/signout', outController.signout);

homeRouter.get("/login", outController.doLogin);

homeRouter.post("/login", body('email').isEmail(), body('password')
    .isLength({min: 5}), outController.login);

homeRouter.get("/", outController.doLogin);

/* Department router */

homeRouter.get('/dept', deptController.getDept);

homeRouter.get('/dept/create', deptController.createDept);

homeRouter.post('/dept/create', body('time').isInt(),
    body('name').isLength({min: 2}), body('start'),
    body('end'), deptController.departmentCreate)

homeRouter.get('/dept/edit/:id', deptController.editDept);

homeRouter.post('/dept/update',
    body('id').isInt(),
    body('name').isLength({min: 3}),
    body('time'),
    body('start'),
    body('end'),
    deptController.updateDept);

homeRouter.post('/dept/delete', body('id'), deptController.deptDelete);

/* Lecturer router */

homeRouter.get('/lecturer/show/:id', lecturerController.showLecturer);


homeRouter.get('/lecturer/create', lecturerController.doCreate);

homeRouter.get('/lecturer/edit', lecturerController.doEdit);

homeRouter.post('/lecturer/create',
    body('name').isLength({min: 2}), body('b_day').isDate(),
    body('surname').isLength({min: 2}), lecturerController.create);

homeRouter.get('/lecturer/edit/:id', lecturerController.editLecturer);

homeRouter.post('/lecturer/update',
    body('id').isInt(),
    body('name').isLength({min: 3}),
    body('surname'),
    lecturerController.updateLecturer);

homeRouter.post('/lecturer/delete', body('id'), lecturerController.lectDelete);

homeRouter.get('/lecturer', lecturerController.getLecturer);


module.exports = homeRouter;