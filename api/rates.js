module.exports = (req, res) => {
    const data = {
        base: 'USD',
        rates: {
            CLP: 987.62,
            PEN: 3.81
        },
        asOf: '2025-10-31T17:51:00Z'
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}