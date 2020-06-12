const client = io()

client.on("welcomeMessage", message => {
    console.log(message)
    client.emit("message", "I am good")
})