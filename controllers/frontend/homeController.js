const frontPath = 'frontend/'

exports.index = (req, res) => {
    res.render(`${frontPath}index.ejs`, {
        title: "Home page",
    });
}

exports.about = (req, res) => {
    res.render(`${frontPath}contact.ejs`, {
        title: "Contact page",
    });
}