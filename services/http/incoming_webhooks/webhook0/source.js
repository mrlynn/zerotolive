// This function is the webhook's request handler.
exports = function(payload, response) {

    return context.services.get("mongodb-atlas").db("zerotolive").collection("responses").find({}).toArray();

};