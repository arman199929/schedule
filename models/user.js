const bcrypt = require('bcrypt');
const conn = require("../config/schedule_db.js");
const {log} = require("util");
const saltRound = 10;
module.exports = class Login {

    constructor(email, name) {
        this.email = email
        this.name = name
    }

    static login(email, password) {

        // const hash = bcrypt.hashSync('123456', saltRound)
        return new Promise(function (res, rej) {
            const sql = 'SELECT id,password FROM users WHERE email = ?';
            conn.query(sql, [email])
                .then(result => {

                    const r = result[0][0]

                    if (r.id > 0) {

                        if (!bcrypt.compareSync(password, r.password)) {
                            rej(false)
                        }
                        res(r.id)
                    } else {
                        rej(false)
                    }
                })
                .catch(err => {
                    console.log(err)
                    rej(err)
                })
        })

    }

    static getAll() {
        return new Promise(function (res, rej) {
            const sql = `SELECT id, name, email
                         FROM users`;
            conn.query(sql)

                .then(result => {
                    res(result[0])
                })

                .catch(err => {
                    console.log(err)
                })
        })
    }

    create() {
        const hash = bcrypt.hashSync('111111', saltRound);
        let uArr = [this.name, this.email, hash];
        console.log(uArr)
        return new Promise((res, rej) => {
            const sql = 'INSERT INTO users (name,email,password) VALUES (?,?,?)';
            conn.query(sql, uArr)
                .then(result => {
                    res(result[0].insertId);
                })
                .catch(err => {
                    console.log(err)
                    rej(err)
                })
        })
    }

    static update(data) {
        return new Promise((res, rej) => {
            const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?'

            conn.query(sql, data)
                .then(result => {
                    res(result)
                })
                .catch(err => {
                    rej(err)
                })
        })
    }

    static changePassword(data) {
        return new Promise((res, rej) => {
            const sql = 'SELECT password FROM users WHERE id = ?'

            conn.query(sql, [data[2]])
                .then(result => {
                    const r = result[0][0]
                    console.log(r)
                    if (!bcrypt.compareSync(data[0], r.password)) {
                        rej(false)
                    }
                    return [data[1], data[2]]
                })
                .then(r => {
                    const hash = bcrypt.hashSync(r[0], saltRound);
                    const sql = 'UPDATE users SET password = ? WHERE id = ?'
                    conn.query(sql, [hash, r[1]])
                        .then(result => {
                            res(result[0].changedRows)
                        })
                        .catch()
                })
                .catch(err => {
                    rej(err)
                })
        })
    }

    static edit(id) {
        return new Promise((res, rej) => {
            const sql = 'SELECT * FROM users WHERE id = ?'
            conn.query(sql, [id])
                .then(result => {
                    res(result[0][0])
                })
                .catch(err => {
                    rej(err)
                })
        })
    }


    static delete(id) {
        return new Promise((res, rej) => {
            const sql = 'DELETE FROM users WHERE id = ?'
            conn.query(sql, [id])
                .then(result => {
                    res(result[0])
                })
                .catch(err => {
                    rej(err)
                })
        })
    }


}

