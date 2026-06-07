const PlayerModel = require("./PlayerModel")
const { uploadImg } = require("../../utilities/helper")

// ADD
add = async (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData.playerName) validation += "Player name is required. "
    if (!formData.age) validation += "Age is required. "
    if (!formData.position) validation += "Position is required. "
    if (!formData.jerseyNumber) validation += "Jersey number is required. "
    if (!formData.teamId) validation += "Team ID is required. "

    if (!!validation) {
        return res.json({ status: 422, success: false, message: validation })
    }

    try {
        // Jersey number duplicate check same team mein
        let existing = await PlayerModel.findOne({
            teamId: formData.teamId,
            jerseyNumber: formData.jerseyNumber
        })

        if (existing) {
            return res.json({
                status: 200,
                success: false,
                message: "Jersey number already taken in this team"
            })
        }

        let playerObj = new PlayerModel()
        playerObj.playerName = formData.playerName
        playerObj.age = formData.age
        playerObj.position = formData.position
        playerObj.jerseyNumber = formData.jerseyNumber
        playerObj.teamId = formData.teamId

        if (req.file) {
            let url = await uploadImg(req.file.buffer)
            playerObj.photo = url
        }

        let savedPlayer = await playerObj.save()
        res.json({ status: 200, success: true, message: "Player Added!", data: savedPlayer })

    } catch (err) {
        res.json({ status: 500, success: false, message: "Internal server error", error: err.message })
    }
}

// ALL — coach apni team ke, user kisi bhi team ke
all = async (req, res) => {
    try {
        let filter = {}
        if (req.body.teamId) filter.teamId = req.body.teamId

        let players = await PlayerModel.find(filter)
            .populate({ path: "teamId", select: "teamName logo" })
            .sort({ jerseyNumber: 1 })

        if (players.length > 0) {
            res.json({ status: 200, success: true, message: "Players data:", data: players })
        } else {
            res.json({ status: 404, success: false, message: "No players found" })
        }
    } catch (err) {
        res.json({ status: 500, success: false, message: "Internal server error", error: err.message })
    }
}

// SINGLE
single = async (req, res) => {
    let validation = ""
    if (!req.body._id) validation += "_id is required"

    if (!!validation) {
        return res.json({ status: 422, success: false, message: validation })
    }

    try {
        let player = await PlayerModel.findOne({ _id: req.body._id })
            .populate({ path: "teamId", select: "teamName logo" })

        if (!player) {
            return res.json({ status: 404, success: false, message: "Player not found" })
        }
        res.json({ status: 200, success: true, message: "Player data:", data: player })
    } catch (err) {
        res.json({ status: 500, success: false, message: "Internal server error", error: err.message })
    }
}

// UPDATE
update = async (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) validation += "_id is required"

    if (!!validation) {
        return res.json({ status: 422, success: false, message: validation })
    }

    try {
        let player = await PlayerModel.findOne({ _id: formData._id })

        if (!player) {
            return res.json({ status: 404, success: false, message: "Player not found" })
        }

        if (formData.playerName) player.playerName = formData.playerName
        if (formData.age) player.age = formData.age
        if (formData.position) player.position = formData.position
        if (formData.jerseyNumber) player.jerseyNumber = formData.jerseyNumber

        if (req.file) {
            let url = await uploadImg(req.file.buffer)
            player.photo = url
        }

        let updatedPlayer = await player.save()
        res.json({ status: 200, success: true, message: "Player Updated!", data: updatedPlayer })

    } catch (err) {
        res.json({ status: 500, success: false, message: "Internal server error", error: err.message })
    }
}

// CHANGE STATUS
changeStatus = async (req, res) => {
    let validation = ""
    if (!req.body._id) validation += "_id is required"

    if (!!validation) {
        return res.json({ status: 422, success: false, message: validation })
    }

    try {
        let player = await PlayerModel.findOne({ _id: req.body._id })

        if (!player) {
            return res.json({ status: 404, success: false, message: "Player not found" })
        }

        player.status = player.status === "Active" ? "Inactive" : "Active"
        await player.save()
        res.json({ status: 200, success: true, message: "Player status updated", data: player })

    } catch (err) {
        res.json({ status: 500, success: false, message: "Internal server error", error: err.message })
    }
}

// DELETE
Delete = async (req, res) => {
    let validation = ""
    if (!req.body._id) validation += "_id is required"

    if (!!validation) {
        return res.json({ status: 422, success: false, message: validation })
    }

    try {
        let player = await PlayerModel.findOne({ _id: req.body._id })

        if (!player) {
            return res.json({ status: 404, success: false, message: "Player not found" })
        }

        await PlayerModel.deleteOne({ _id: req.body._id })
        res.json({ status: 200, success: true, message: "Player deleted!" })

    } catch (err) {
        res.json({ status: 500, success: false, message: "Internal server error", error: err.message })
    }
}

module.exports = { add, all, single, update, changeStatus, Delete }