const {validationResult} = require("express-validator");
const url = require("url");
const Dept = require("../../models/dept");
const User = require("../../models/user");
const deptPath = 'backend/dept/', pathInDept = '/backend/dept/', pathDept = '/backend/dept'

exports.getDept = (req, res) => {
    Dept.deptLIst()
        .then(result => {

            res.render(`${deptPath}index.ejs`, {
                title: "DEPT LIST",
                layout: 'layouts/backend.ejs',
                dept: result
            })
        })
        .catch(err => {
            console.log(err)
        });

}

exports.createDept = (req, res) => {
    res.render(`${deptPath}create.ejs`, {
        title: "CREATE DEPT",
        layout: 'layouts/backend.ejs',

    })
}

exports.departmentCreate = (req, res) => {

    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'name' || arrParam === 'time' || arrParam === 'start' || arrParam === 'end') {
            return res.redirect(url.format({
                pathname: pathInDept + 'create',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const dept = new Dept(req.body.name, req.body.time, req.body.start, req.body.end);
    dept.createDept()
        .then(result => {
            res.redirect(`/backend/dept`)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.editDept = (req, res) => {
    const id = req.params.id
    Dept.deptEdit(id)
        .then(result => {

            res.render(`${deptPath}edit.ejs`, {
                title: "EDIT DEPARTMENT",
                layout: 'layouts/backend.ejs',
                dept: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.updateDept = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'name' || arrParam === 'time' || arrParam === 'start' || arrParam === 'end' || arrParam === 'id') {
            return res.redirect(url.format({
                path: pathInDept + 'edit',
                query: {
                    error: arrParam
                }
            }))
        }
    }

    const dataDept = [req.body.name, req.body.time, req.body.start, req.body.end, req.body.id]
    Dept.deptUpdate(dataDept)
        .then(result => {
            res.redirect(pathDept)
        })
        .catch(err => {
            res.redirect(url.format({
                path: pathInDept + 'edit',


            }))
        })

}

exports.deptDelete = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'id') {
            return res.redirect(url.format({
                pathname: pathInDept,
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const deptId = req.body.id;
    Dept.deleteDept(deptId)
        .then(result => {
            res.redirect(pathInDept)
        })
        .catch(err => {
            console.log(err)
        });
}