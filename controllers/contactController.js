const asyncHandler = require("express-async-handler")
// we dont need to use try catch block over here ^^^^
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route Get /api/contacts
//@access private

const getContacts = asyncHandler(async (req,res) =>{
    const contacts = await Contact.find({user_id: req.user.id});
    // res.status(200).json({message:"get all contacts"});
    res.status(200).json(contacts);
});


//@desc Get contacts
//@route GET /api/contacts
//@access private

const createContact = asyncHandler(async (req,res) =>{
    console.log("the request body is :", req.body);
    const {name,phone} = req.body;
    if(!name || !phone){
        res.status(400);
        throw new Error("Fill all fields");
    }
    const contact = await Contact.create({
        name,
        phone,
        user_id: req.user.id
    });
    // res.status(201).json({message:"create Contact"});
    res.status(201).json(contact);
});

//@desc GET contacts
//@route GET /api/contacts:id
//@access public

const getContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    // res.status(200).json({message:`get contact ${req.params.id}`});
    res.status(200).json(contact);
});


//@desc update contacts
//@route post /api/contacts:id
//@access public

const updateContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
      if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't permit to use other data")
      }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    // res.status(200).json({message:`Update contact ${req.params.id}`});
    res.status(200).json(updateContact);
});


//@desc delete contacts
//@route post /api/contacts:id
//@access private

const deleteContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't permit to use other data")
      }
    // await Contact.remove(); to remove all the data's
    await Contact.deleteOne({_id: req.params.id});
    // res.status(200).json({message:`delete contact ${req.params.id}`});
    res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact , updateContact, deleteContact}