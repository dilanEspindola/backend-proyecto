const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {
    const get = await pool.query('select * from personal');
    if (get.length < 1) {
        res.send('no hay resultados');
    } else {
        res.json(get);
    }
});

router.post('/', async (req, res) => {
    try {
        await pool.query('insert into personal set ?', [req.body]);
        res.redirect('http://localhost:3000/admin/personal')
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('update personal set ? where id = ?', [req.body, id]);
        res.send('updated');
    } catch (error) {
        console.log(error);
    }
});
router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('update personal set ? where id = ?', [req.body, id]);
        res.redirect('http://localhost:3000/admin/personal');
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('delete from personal where id = ?', [id]);
        res.redirect('http://localhost:3000/admin/personal');
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('delete from personal where id = ?', [id]);
        res.redirect('http://localhost:3000/admin/personal');
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;