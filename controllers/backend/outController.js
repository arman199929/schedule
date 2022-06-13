const {body, validationResult} = require('express-validator')
const url = require('url')
const bPath = 'backend/'
const User = require('../../models/user')


exports.doLogin = (req, res) => {

    const urlValue = Object.values(req.query).toString()

    let pass, mail = "";
    if (urlValue === 'password')
        pass = urlValue
    if (urlValue === 'email')
        mail = urlValue


    res.render(`${bPath}login.ejs`, {
        title: "Log_In",
        layout: 'layouts/auth.ejs',
        pass, mail
    })
};


exports.login = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'password' || arrParam === 'email') {
            return res.redirect(url.format({
                pathname: '/backend',
                query: {
                    error: arrParam
                }
            }))
        }

        // return res.render('backend/login.ejs', {errors: vErr.array()[0].param,title:'Out'})
    }


    const email = req.body.email;
    const password = req.body.password;
    let path = ''
    User.login(email, password)

        .then(result => {
            if (Number.isInteger(result)) {

                path = 'dashboard/'
                req.session.uId = result;
            }
            res.redirect(path + result)
        })
        .catch(err => {
            console.log(err)
        });

}

exports.signout = (req, res) => {
    const session = req.session;
    session.destroy(function(err) {
        res.redirect('/backend')
    });
}

