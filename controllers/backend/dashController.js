const url = require("url");
const User = require("../../models/user");
const bPath = 'backend/'

exports.index = (req, res) => {
    const session = req.session;
    // if (session.uId !== parseInt(req.params.id)) {
    //     res.redirect(url.format({
    //         pathname: '/backend',
    //         query: {
    //             error: 'Log_in error!'
    //         },
    //         title: 'Log_In'
    //     }));
    // }
    // else
    // {
    res.render(`${bPath}dashboard.ejs`, {
        title: "",
        layout: 'layouts/backend.ejs'
    });
    // }

}

