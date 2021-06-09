
module.exports = async (req, res, next) => {
    try {
        const { api_key } = req.query;
        if (api_key === process.env.API_KEY)
            next();
        else throw new Error();
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ success: false, message: "API KEY is InValid, please provide a valid API KEY" });
    }
};
