import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
};
app.use(cors());

app.use(express.json());

//route 1: to handle GET requests
app.get("/", (req, res) => {
  res.send("Hello React, I am your server");
});

let members = [];

//Route 2: (endpoint) to handle POST requests to create a new member
app.post("/members", (req, res) => {
  const { name, lastname, position } = req.body;

  const newMember = {
    id: String(members.length + 1),
    name: name,
    lastname: lastname,
    position: position,
  };

  members.push(newMember);

  res.status(201).json(newMember);
});

//Route 3: to handle GET requests to read members
app.get("/members", (req, res) => {
  res.status(200).json(members);
});

// Route 4: to handle DELETE requests to delete a member
app.delete("/members/:id", (req, res) => {
  const memberId = req.params.id;

  const memberIndex = members.findIndex((member) => member.id === memberId); //ได้ค่า index

  if (memberIndex !== -1) {
    members.splice(memberIndex, 1); //ตำแหน่ง index, จำนวน member ที่จะต้องลบ

    res.status(200).send("Member with ID "+memberId+" Deleted!");
  } else {
    res.status(404).send("Member not found");
  }
});

// Route 5: to handle PUT requests to update a member
app.put("/members/:id", (req, res) => {
  const memberId = req.params.id;

  const {name, lastname, position} = req.body;
  const member = members.find((m) => m.id === memberId);

  if (member) {
    if (name !== undefined) member.name=name;
    if (name !== undefined) member.lastname=lastname;
    if (name !== undefined) member.position=position;

    res.status(200).json(member)
  } else {
    res.status(404).send("Member not found");
  }

})


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✌️`);
});
