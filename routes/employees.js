const express = require('express');
const router = express.Router();
const EmployeeModel = require('../models/employee_model');

router.use(express.json());

//? create 
router.post('/',async (req,res)=>{
    const newEmployee = new EmployeeModel({
        name:req.body.name,
        salary:req.body.salary,
        department:req.body.department,
        location:req.body.location
    });
    try{
        let createEmployee = await newEmployee.save();
        res.status(201).json({message:"Profile created sucessfully",details:createEmployee});
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

//? Read

router.get('/',async (req,res)=>{
    try{
        let allEmployees =await EmployeeModel.find();
        res.status(200).json(allEmployees);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

//?  one employee
router.get('/:id',getEmployee,(req,res)=>{
    res.send(res.Employee);
})

// UPDATE

router.patch('/:id',getEmployee,async (req,res)=>{
    if(req.body.name != null){
        res.Employee.name = req.body.name ;
    };
    if(req.body.salary != null){
        res.Employee.salary = req.body.salary ;
    };
    if(req.body.department != null){
        res.Employee.department = req.body.department ;
    };
    if(req.body.location != null){
        res.Employee.location = req.body.location ;
    };
    try{
       let updatedEmployee = await res.Employee.save();
       res.send(updatedEmployee)
    }catch(err){
        res.status(400).json({message:err.message});
    };
});

// DELETE

router.delete('/:id',getEmployee,async (req,res)=>{
    try{
        await res.Employee.remove();
        res.send({message:"Profile delted successfully"});

    } catch(err){
        res.status(500).json({message:err.message});
    };

});

async function getEmployee(req,res,next){
    try{
      var Employee = await EmployeeModel.findById(req.params.id);
      if(Employee == null){
        res.status(404).json({message:"Employee not found"});
      };
    }catch (err){
        res.status(500).json({message:err.message});
    };
    res.Employee = Employee;
    next();
};


module.exports = router;

