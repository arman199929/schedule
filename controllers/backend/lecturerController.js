const {validationResult} = require("express-validator");
const url = require("url");
const Lecturer = require("../../models/lecturer");
const User = require("../../models/user");
const Dept = require("../../models/dept");
const lPath = 'backend/lecturer/', lecturerPath = '/backend/lecturer/', lectPath = '/backend/lecturer'

exports.getLecturer = (req, res) => {
    Lecturer.lecturerLIst()
        .then(result => {

            res.render(`${lPath}index.ejs`, {
                title: "Lecturer LIST",
                layout: 'layouts/backend.ejs',
                lect: result
            })
        })
        .catch(err => {
            console.log(err)
        });
}

exports.doCreate = (req, res) => {
    Lecturer.getSubjects()
        .then(result => {
            res.render(`${lPath}create.ejs`, {
                title: "CREATE LECTURER",
                layout: 'layouts/backend.ejs',
                subject: result
            })
                .catch(err => {
                    console.log(err)
                })
        })

}

exports.create = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'name' || arrParam === 'email' || arrParam === 'b_day') {
            return res.redirect(url.format({
                pathname: lecturerPath + 'create',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    console.log(req.body)
    const lecturer = new Lecturer(req.body.name, req.body.surname, req.body.phone, req.body.email,
        req.body.b_day, req.body.address, req.body.profession, req.body.work_name, req.body.subject);
    lecturer.create()
        .then(result => {
            res.redirect(`/backend/lecturer`)
        })
        .catch(err => {
            console.log(err)
        })

}

exports.showLecturer = (req, res) => {
    Lecturer.show(req.params.id)
        .then(result => {

            res.render(`${lPath}show.ejs`, {
                title: "Lecturer",
                layout: 'layouts/backend.ejs',
                lect: result
            })
        })
        .catch(err => {
            console.log(err)
        });
}

exports.doEdit = (req, res) => {
    Lecturer.getSubjects()
        .then(result => {
            res.render(`${lPath}edit.ejs`, {
                layout: 'layouts/backend.ejs',
                subject: result
            })
                .catch(err => {
                    console.log(err)
                })
        })

}

exports.editLecturer = (req, res) => {
    const id = req.params.id

    Lecturer.editLect(id)
        .then(result => {
            res.render(`${lPath}edit.ejs`, {
                title: "EDIT LECTURER",
                layout: 'layouts/backend.ejs',
                lect: result
            })
        })
        .catch(err => {
            console.log(err)
        })

}

exports.updateLecturer = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'name' || arrParam === 'surname' || arrParam === 'b_day' || arrParam === 'email' || arrParam === 'phone' || arrParam === 'address' || arrParam === 'profession' || arrParam === 'work_name' || arrParam === 'id') {
            return res.redirect(url.format({
                path: lecturerPath + 'edit',
                query: {
                    error: arrParam
                }
            }))
        }
    }

    const dataLect = [req.body.name, req.body.surname, req.body.b_day, req.body.email, req.body.phone, req.body.address,
        req.body.profession, req.body.work_name, req.body.id]
    Lecturer.lectUpdate(dataLect)
        .then(result => {
            res.redirect(lectPath)
        })
        .catch(err => {
            res.redirect(url.format({
                path: lecturerPath + 'edit',
            }))
        })

}

exports.lectDelete = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'id') {
            return res.redirect(url.format({
                pathname: lecturerPath,
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const lId = req.body.id;
    console.log(lId)
    Lecturer.deleteLect(lId)
        .then(result => {
            res.redirect(lecturerPath)
        })
        .catch(err => {
            console.log(err)
        });
}
