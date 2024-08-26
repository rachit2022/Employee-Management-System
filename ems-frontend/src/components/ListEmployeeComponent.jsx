import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees,setEmployees] = useState([])

    const navigator=useNavigate();

    useEffect(() =>{
        getAllEmployees();
    },[])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error=>{
            console.error(error);
        })
    }

    function addNewEmployee(){
        navigator('/add-employee');
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        deleteEmployee(id).then((response)=>{
            getAllEmployees();
        }).catch(error=>{
            console.error(error);
        })
    }

    return (
    <div className='m-0 bg-warning pt-4 pb-5'>
        <div className='container'>
            <h2 className='text-center display-3'>List of Employees</h2>
            <div className='text-center'>
            <button className='btn btn-primary mb-3' onClick={addNewEmployee}>Add Employee</button>
            </div>
            <div className='table-responsive'>
            <table className='table table-dark table-bordered mb-5 pb-5'>
                <thead>
                    <tr>
                        <th>Emplopyee ID</th>
                        <th>Emplopyee First Name</th>
                        <th>Emplopyee Last Name</th>
                        <th>Emplopyee Email ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr className='table-active' key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info me-2 mb-2' onClick={()=>updateEmployee(employee.id) }>Update</button>
                                    <button className='btn btn-danger mb-2' onClick={()=>removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        </div>
    </div>
    )
}

export default ListEmployeeComponent
