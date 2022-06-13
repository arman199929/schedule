const {validationResult} = require("express-validator");
const url = require("url");
const User = require("../../models/user");
const bPath = 'backend/user/', pathname = '/backend/users/', path = '/backend/users'

exports.getUsers = (req, res) => {
    User.getAll()
        .then(result => {
            res.render(`${bPath}index.ejs`, {
                title: "USER LIST",
                layout: 'layouts/backend.ejs',
                users: result
            })
        })
        .catch(err => {
            console.log(err)
        });

}

exports.doCreate = (req, res) => {
    res.render(`${bPath}create.ejs`, {
        title: "CREATE USER",
        layout: 'layouts/backend.ejs',

    })
}

exports.create = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'name' || arrParam === 'email') {
            return res.redirect(url.format({
                pathname: pathname + 'create',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const user = new User(req.body.email, req.body.name);
    user.create()
        .then(result => {
            res.redirect(`/backend/users`)
        })
        .catch(err => {
            console.log(err)
        })

}

exports.editUsers = (req, res) => {
    const id = req.params.id
    User.edit(id)
        .then(result => {
            res.render(`${bPath}edit.ejs`, {
                title: "Edit user!",
                layout: 'layouts/backend.ejs',
                user: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.update = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'name' || arrParam === 'email' || arrParam === 'id') {
            return res.redirect(url.format({
                pathname: pathname + 'edit',
                query: {
                    error: arrParam
                }
            }))
        }
    }

    const data = [req.body.name, req.body.email, req.body.id]
    User.update(data)
        .then(result => {
            res.redirect(path)
        })
        .catch(err => {
            res.redirect(url.format({
                pathname: pathname + 'edit',


            }))
        })

}


exports.changePass = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'oldpass' || arrParam === 'newpass' || arrParam === 'repass') {
            return res.redirect(url.format({
                pathname: pathname + 'edit',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const data = [req.body.oldpass, req.body.newpass, req.body.id]
    User.changePassword(data)
        .then(result => {
            res.render(`backend/login.ejs`, {
                title: "Log_In",
                layout: 'layouts/auth.ejs',
                pass: true, mail: true
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteUsers = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'id') {
            return res.redirect(url.format({
                pathname,
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const dId = req.body.id
    User.delete(dId)
        .then(result => {
            res.redirect(pathname)
        })
        .catch(err => {
            console.log(err)
        });
}

