// ** Change Log ** //
// - user method changed to history
// - id variable changed to timer_id
// - time variable changed to created_on
// - status variable changed to total_time
// - Changed table name from users to timer_history

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'admin',
    port: 5432,
})

const getHistory = (req, res) => {
    pool.query('SELECT * FROM timer_history ORDER BY timer_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getHistoryById = (req, res) => {
    const timer_id = parseInt(req.params.timer_id)

    pool.query('SELECT * FROM timer_history WHERE timer_id = $1', [timer_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createHistory = (req, res) => {
    const { total_time, created_on } = req.body
    console.log(total_time)
    pool.query('INSERT INTO timer_history (total_time, created_on) VALUES ($1, $2) RETURNING timer_id', [total_time, created_on], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Timer history added with ID: ${results.rows[0].timer_id}`)
    })
}

// update not needed
const updateHistory = (req, res) => {
    const { total_time, created_on } = req.body
    pool.query(
        'UPDATE timer_history SET total_time = $1, created_on = $2 WHERE timer_id = $3',
        [total_time, created_on, timer_id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${timer_id}`)
        })
}

const deleteHistory = (req, res) => {
    const timer_id = parseInt(req.params.timer_id)

    pool.query('DELETE FROM timer_history WHERE timer_id = $1', [timer_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${timer_id}`)
    })
}

module.exports = {
    getHistory,
    getHistoryById,
    createHistory,
    updateHistory,
    deleteHistory
}