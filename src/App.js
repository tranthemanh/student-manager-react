import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [
                {name: "Manh", phone: "0123456789", email: "manh@gmail.com"},
                {name: "Trang", phone: "0123456789", email: "trang@gmail.com"},
                {name: "Quan", phone: "0123456789", email: "quan@gmail.com"},
            ],
            form: {name: '', phone: '', email: ''},
            isValid: false,
            indexSelected: -1
        };
    }

    handleChange = (event) => {
        this.setState((state) => {
            const form = {...state.form};
            form[event.target.name] = event.target.value;
            return {form};
        }, () => this.checkInvalidForm());
    };

    handleSelect = (studentSelected, index) => {
        this.setState({
            form: {...studentSelected},
            indexSelected: index
        });
    };

    checkInvalidForm = () => {
        const {name, phone, email} = this.state.form;
        const isValid = name && phone && email;
        this.setState({isValid});
    };

    handleSubmit = () => {
        if (this.state.isValid) {
            const newList = [...this.state.studentList];
            if (this.state.indexSelected > -1) {
                newList.splice(this.state.indexSelected, 1, this.state.form);
            } else {
                newList.push(this.state.form);
            }
            this.setState({
                studentList: newList,
                form: {name: '', phone: '', email: ''},
                isValid: false,
                indexSelected: -1
            });
        }
    };

    handleDelete = (index) => {
        const newList = [...this.state.studentList];
        newList.splice(index, 1);
        this.setState({studentList: newList});
    };

    render() {
        const {studentList, form} = this.state;
        return (
            <div>
                <div className="container">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Student <b>List</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i
                                        className="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
                                </div>
                            </div>
                        </div>

                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentList.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.name}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <a href="#editEmployeeModal" className="edit" data-toggle="modal"
                                           onClick={() => this.handleSelect(student, index)}><i
                                            className="material-icons" data-toggle="tooltip"
                                            title="Edit">&#xE254;</i></a>
                                        <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"
                                           onClick={() => this.handleDelete(index)}><i
                                            className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                </div>

                {/*    Add Student*/}
                <div id="addEmployeeModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Student</h4>
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Name: </label>
                                        <input name="name" value={form.name} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone: </label>
                                        <input type="number" name="phone" value={form.phone}
                                               onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email: </label>
                                        <input name="email" value={form.email} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal"
                                           value="Cancel"/>
                                    <input type="submit" className="btn btn-success" value="Add"
                                           onClick={this.handleSubmit} disabled={!this.state.isValid}/>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                {/*    update Student*/}
                <div id="editEmployeeModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Employee</h4>
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Name: </label>
                                        <input name="name" value={form.name} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone: </label>
                                        <input type="number" name="phone" value={form.phone}
                                               onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email: </label>
                                        <input name="email" value={form.email} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal"
                                           value="Cancel"/>
                                    <input type="submit" className="btn btn-success" value="Add"
                                           onClick={this.handleSubmit} disabled={!this.state.isValid}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default App;
