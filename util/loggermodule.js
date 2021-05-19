const { configure, getLogger } = require("log4js");
const logger = getLogger();
logger.level = "debug";

configure({
    appenders: {
        cheese  : { type: "file", filename: "mainLog.log" },
        console : { type: "stdout"}
    },
    categories: {
        default: { appenders: ["cheese","console"], level: "debug" }
    }
})

module.exports = logger