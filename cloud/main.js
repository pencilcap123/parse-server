let Parse = require("parse/node")
Parse.Cloud.beforeSave("Address", (req, resp)=>{
    let obj = req.object;
    if (obj.get("key1") === "key11") {
        console.log("do not permit value key1")
        throw new Error("do not permit key1");
    }
})
