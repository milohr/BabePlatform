"use strict"

class Index
{
    home(req, res)
    {
        res.status(200).render("index", {color: "#333"})
    }
}

module.exports = Index
