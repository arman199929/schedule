const bcrypt = require('bcrypt');
const conn = require("../config/schedule_db.js");
const {log} = require("util");
const saltRound = 10;

module.exports = class Lecturer {
    constructor(name, surname, phone, email, b_day, address, profession, work_name, subject) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.email = email;
        this.b_day = b_day;
        this.address = address;
        this.profession = profession;
        this.work_name = work_name;
        this.subject_id = JSON.stringify(subject);
    }

    static lecturerLIst() {
        return new Promise((res, rej) => {
            const sql = 'SELECT id,name,surname,b_day,phone,email,address,profession,work_name FROM lecturers';
            conn.query(sql)
                .then(result => {
                    res(result[0])
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    static getSubjects() {
        return new Promise((res, rej) => {
            const sql = 'SELECT id , name FROM subjects';
            conn.query(sql)
                .then(result => {
                    res(result[0])
                })
                .catch(err => {
                    console.log(err)
                    rej(err)
                })
        })
    }

    create() {
        let uArr = [this.name, this.surname, this.phone, this.email, this.b_day,
            this.address, this.profession, this.work_name, this.subject_id];
        console.log(uArr)
        return new Promise((res, rej) => {
            const sql = 'INSERT INTO lecturers (name,surname,phone, email, b_day,address,profession,work_name,subject_id) VALUES (?,?,?,?,?,?,?,?,?)';
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

    static deleteLect(id) {
        return new Promise((res, rej) => {
            const sql = 'DELETE FROM lecturers WHERE id = ?'
            conn.query(sql, [id])
                .then(result => {
                    res(result[0])
                })
                .catch(err => {
                    rej(err)
                })
        })
    }

    static show(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM lecturers WHERE id = ?'
            conn.query(sql, [id])
                .then(result => {

                    return result[0]
                })
                .then(res => {
                    const ids = res[0].subject_id;
                    const query = 'SELECT name FROM subjects WHERE id IN (' + ids + ')'
                    conn.query(query)
                        .then(result => {

                            res[0].subject_id = result[0]
                            resolve(res[0])
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static editLect(id) {
        return new Promise((res, rej) => {
            const sql = 'SELECT * FROM lecturers WHERE id = ?'
            conn.query(sql, [id])
                .then(result => {
                    res(result[0][0])
                })
                .catch(err => {
                    rej(err)
                })
        })
    }

    static lectUpdate(dataLect) {
        return new Promise((res, rej) => {
            const sql = 'UPDATE lecturers SET name = ?, surname = ? WHERE id = ?'

            conn.query(sql, dataLect)
                .then(result => {
                    res(result)
                })
                .catch(err => {
                    rej(err)
                })
        })
    }


}