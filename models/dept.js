const bcrypt = require('bcrypt');
const conn = require("../config/schedule_db.js");
const {log} = require("util");
const saltRound = 10;

module.exports = class Dept {
    constructor( name, time, start, end) {
        this.name = name;
        this.time = time;
        this.start = start;
        this.end = end

    }

    static deptLIst() {
        return new Promise((res, rej) => {
            const sql = 'SELECT id,name,time,start,end FROM department';
            conn.query(sql)
                .then(result => {
                    res(result[0])
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    createDept() {

        let deptArr = [this.name, this.time, this.start, this.end];
        return new Promise((res, rej) => {
            const sql = 'INSERT INTO department (name,time,start,end) VALUES (?,?,?,?)';
            conn.query(sql, deptArr)
                .then(result => {
                    res(result[0].insertId);
                })
                .catch(err => {
                    console.log(err)
                    rej(err)
                })
        })
    }

    static deptEdit(id) {
        return new Promise((res, rej) => {
            const sql = 'SELECT * FROM department WHERE id = ?'
            conn.query(sql, [id])
                .then(result => {
                    res(result[0][0])
                })
                .catch(err => {
                    rej(err)
                })
        })
    }

    static deptUpdate(dataDept) {
        return new Promise((res, rej) => {
            const sql = 'UPDATE department SET name = ?, time = ?,start = ?,end = ? WHERE id = ?'

            conn.query(sql, dataDept)
                .then(result => {
                    res(result)
                })
                .catch(err => {
                    rej(err)
                })
        })
    }

    static deleteDept(id) {
        return new Promise((res, rej) => {
            const sql = 'DELETE FROM department WHERE id = ?'
            conn.query(sql,[id])
                .then(r => {
                    console.log(r)
                    res(r[0])
                })
                .catch(err => {
                    rej(err)
                })
        })
    }
}