import { Member } from "../../models/Member.js";

// createMember
export const createMember = async(req, res, next) => {
    const{name, lastname, position} = req.body

    if(!name || !lastname || !position) {
        const error = new Error("name, lastname and position are required!")
        error.status = 400;
        return next(error);
    }

    try {
        const member = await Member.create({name, lastname, position})
        res.status(201).json({
            error: false,
            member,
            message: "Member created successfully!",
        })
    }   catch (err) {
        next(err)
    }
};

// getMember
export const getMembers = async(req, res, next) => {
    try {
        const members = await Member.find().sort({createdAt: -1})

        res.status(200).json({
            error: false,
            members,
            message: "All members retrieved successfully!",
        })
    }   catch (err) {
        next(err)
    }
};

// editMember
export const editMember = async(req, res, next) => {

    const memberId= req.params.id;

    const {name, lastname, position} = req.body;

    try {
        const member = await Member.findOne({_id: memberId})
        if(!member) {
            const error = new Error("Member not found!")
            error.status=404;
            return next(error);
        }

        if(name) member.name = name;
        if(lastname) member.lastname = lastname;
        if(position) member.position = position;

        await member.save()

        res.status(201).json({
            error: false,
            member,
            message: "Member updated successfully!",
        });
    }   catch (err) {
        next (err)
    }
};


// deleteMember
export const deleteMember = async(req, res, next) => {
    const memberId = req.params.id

    try {
        const member = await Member.findOne({_id: memberId})

        if(!member) {
            const error= new Error("Member not found!");
            error.status=404;
            return next (error);
        }

        await Member.deleteOne({_id: memberId})
        res.status(200).json({
            error: false,
            message: "Member deleted successfully!",
        })
    }   catch(err) {
        next(err);
    }
};