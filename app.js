const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const allChatData = fs.readFileSync("chatHistory.json");


const chatHistoryArray = [];
chatHistoryArray.push(allChatData);
app.get("/", (req, res) => {

    res.send("Hello world")
})



app.post("/chat", async (req, res) => {


    // const chatHistory = req.body;
    // console.log(req.body);
    // const chatObject = {
    //     date: Date.now(),
    //     name: "Owner",
    //     chat: req.body,

    // }
    // chatHistoryArray.push(chatObject);
    // let newData2 = JSON.stringify(chatHistoryArray);
    // fs.writeFile("./chatHistory.json", JSON.stringify(newData2, null, 2), err => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("File Succesfully written");
    //     }
    // })

    const jsonData = JSON.parse(allChatData);
    jsonData.users.push({
        name: 'Tipu',
        time: new Date().toLocaleString(),
        chatData: req.body,
        // or any other data we want to add in that object
    });
    const jsonString = JSON.stringify(jsonData);

    await fs.writeFileSync('chatHistory.json', jsonString, 'utf-8', (err) => {
        if (err) throw err;
        else {
            console.log("File Succesfully written");
            res.send("Successful")
        }
    });

    // const update_data = fs.readFileSync('chatHistory.json');
    // const updated_jsonData = JSON.parse(update_data);
    // console.log("After Adding data", JSON.stringify(updated_jsonData, null, 2));

})

// this is a test 
// this is another test


app.listen(5000, () => {
    console.log(`server is listening at port no 5000`);
})