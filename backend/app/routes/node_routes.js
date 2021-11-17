module.exports = function (app, db) {
    app.post('/', (req, res) => {
        res.send('Hello')
    })

    app.get('/', (req, res) => {
        res.send('Please go back.')
    })
}