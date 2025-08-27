import express from "express";
import { createMember, deleteMember, editMember, getMembers } from "./controllers/membersController.js";

const router = express.Router();

// Route 1 to handle GET requests
router.get("/", (req, res, next) => {
    try {
        res
        .status(200)
        .send(
            "Hello!, this is an Express API server for a React Assessment App."
        );
    }   catch(err)  {
        next(err);
    }
});

// let members = [];

// Route 2 (endpoint) to handle POST requests to create a new member
router.post("/members", createMember);
// router.post("/members", (req, res) => {
//   const { name, lastname, position } = req.body;

//   const newMember = {
//     id: String(members.length + 1), //ดูว่าข้างในmembersมีของกี่ชิ้นแล้วให้ +1
//     name: name,
//     lastname: lastname,
//     position: position,
//   };

//   members.push(newMember);

//   res.status(201).json(newMember);
// });


// Route 3 to handle GET request to read members

router.get("/members", getMembers);
// router.get("/members", (req, res) => {
//   res.status(200).json(members);
// });

//Route 4 to handle DELETE requests to delete a member

router.delete("/members/:id", deleteMember);
// router.delete("/members/:id", (req, res) => {
//   const memberId = req.params.id;

//   const memberIndex = members.findIndex((member) => member.id === memberId);

//   if (memberIndex !== -1) {
//     members.splice(memberIndex, 1);

//     res.status(200).send(`Member with ID ${memberId} deleted`);
//   } else {
//     res.status(404).send("Member not found.");
//   }
// });

//Route 5 to handle PUT request to update a member

router.put("/members/:id", editMember);
// router.put("/members/:id", (req, res) => {
//   const memberId = req.params.id;

//   const { name, lastname, position } = req.body;

//   const member = members.find((m) => m.id === memberId);

//   if (member) {
//     if (name !== undefined) member.name = name;
//     if (lastname !== undefined) member.lastname = lastname;
//     if (position !== undefined) member.position = position;

//     res.status(200).json(member);
//   } else {
//     res.status(404).send("Member not found.");
//   }
// });

export default router;