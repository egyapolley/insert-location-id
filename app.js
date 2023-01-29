const fs = require('fs')
const moment = require("moment")
const path = require("path")
require("dotenv").config()

const sequelize = require("./utils/dbConfig");
const LocationInfo = require("./models/CellId")

sequelize.sync({logging:false}).then(() => {


    const {input_dir} = process.env
    const fileName = `surfline-cellId-${moment().format("YYYY-MM-DD")}.lst`
    const inputFile = path.join(input_dir, fileName)
    fs.readFile(inputFile, {encoding: "utf-8"}, async (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let result = []
            for (const string of data.trim().split("\n")) {
                const [msisdn, cellId] = string.split("|")
                result.push({msisdn, cellId})

            }
            if (result.length > 0) {
                await LocationInfo.bulkCreate(result,{ignoreDuplicates:true})
            }


        }

    })

}).catch(error => {
    console.log(error)

})








