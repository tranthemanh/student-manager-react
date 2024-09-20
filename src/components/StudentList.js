import { useEffect, useRef, useState } from "react";
import StudentModal from "./StudentModal";

const StudentList = () => {
    const [studentList, setStudentList] = useState([
        { name: "Anh", phone: "0123456789", email: "Anh@gmail.com" },
        { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
        { name: "Quan", phone: "0123456789", email: "quan@gmail.com" },
        { name: "Manh", phone: "98754", email: "manh1@gmail.com" },
        { name: "Trang", phone: "98754", email: "trang@gmail.com" },
        { name: "Quan", phone: "0123456789", email: "quan@gmail.com" },
        { name: "Manh", phone: "0123456789", email: "manh@gmail.com" },
        { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
        { name: "Quan", phone: "0123456789", email: "quan@gmail.com" },
        { name: "Manh", phone: "0123456789", email: "manh@gmail.com" },
        { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
        { name: "Quan", phone: "0123456789", email: "quan@gmail.com" },
        { name: "Manh", phone: "0123456789", email: "manh@gmail.com" },
        { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
        { name: "Quan", phone: "0123456789", email: "quan@gmail.com" },
        { name: "Manh", phone: "0123456789", email: "manh@gmail.com" },
        { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
        { name: "Quan", phone: "0123456789", email: "quan@gmail.com" },
        { name: "Manh", phone: "0123456789", email: "manh@gmail.com" },
        { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
        { name: "Quan", phone: "0123456789", email: "quan@gmail.com" },
        // Thêm nhiều sinh viên khác nếu cần
    ]);

    const [search, setSearch] = useState({ name: "", phone: "", email: "" });
    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    const [indexSelected, setIndexSelected] = useState(-1);
    const [isValid, setIsValid] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5; // Mỗi trang hiển thị 5 sinh viên
    const closeModal = useRef(null);

    useEffect(() => {
        const { name, phone, email } = form;
        const isValid = name && phone && email;
        setIsValid(isValid);
    }, [form]);

    useEffect(() => {
        document.title = "Student List";
    }, []);

    // Lọc danh sách sinh viên theo tìm kiếm
    const filteredList = studentList
        .filter(student =>
            student.name.toLowerCase().includes(search.name.toLowerCase()) &&
            student.phone.includes(search.phone) &&
            student.email.toLowerCase().includes(search.email.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)); // Sắp xếp theo tên

    // Phân trang
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredList.slice(indexOfFirstStudent, indexOfLastStudent);

    const handleSelect = (studentSelected, index) => {
        setForm({ ...studentSelected });
        setIndexSelected(index);
    };

    const handleChange = (event) => {
        const newForm = { ...form };
        newForm[event.target.name] = event.target.value;
        setForm(newForm);
    };

    const handleSearchChange = (event) => {
        const newSearch = { ...search };
        newSearch[event.target.name] = event.target.value;
        setSearch(newSearch);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            const newList = [...studentList];
            if (indexSelected > -1) {
                newList.splice(indexSelected, 1, form);
            } else {
                newList.push(form);
            }
            setForm({ name: "", phone: "", email: "" });
            setStudentList(newList);
            setIsValid(false);
            setIndexSelected(-1);
            closeModal.current.click();
        }
    };

    const handleDelete = (index) => {
        const newList = [...studentList];
        newList.splice(index, 1);
        setStudentList(newList);
    };

    // Chuyển sang trang trước
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Chuyển sang trang sau
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredList.length / studentsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Tạo logic hiển thị phân trang với dấu "..."
    const totalPages = Math.ceil(filteredList.length / studentsPerPage);
    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 3) {
            // Hiển thị toàn bộ trang nếu <= 3 trang
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Nếu có nhiều hơn 3 trang, hiển thị logic phân trang
            if (currentPage === 1 || currentPage === 2) {
                pageNumbers.push(1, 2, 3, "...", totalPages);
            } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, "...", currentPage, "...", totalPages);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Danh sách <b>Sinh viên</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <a href="#EmployeeModal" className="btn btn-success" data-toggle="modal">
                            <i className="material-icons">&#xE147;</i> <span>Thêm mới sinh viên</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Form tìm kiếm */}
            <div className="row">
                <div className="col-md-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Tìm theo tên"
                        className="form-control"
                        value={search.name}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Tìm theo SĐT"
                        className="form-control"
                        value={search.phone}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        name="email"
                        placeholder="Tìm theo email"
                        className="form-control"
                        value={search.email}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Bảng danh sách sinh viên */}
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th style={{width: "200px"}}>Tên</th>
                    <th>SĐT</th>
                    <th>Email</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentStudents.map((student, index) => (
                    <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.phone}</td>
                        <td>{student.email}</td>
                        <td>
                            <a href="#EmployeeModal" className="edit" data-toggle="modal"
                               onClick={() => handleSelect(student, index)}>
                                <i className="material-icons" data-toggle="tooltip" title="Sửa">&#xE254;</i>
                            </a>
                            <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"
                               onClick={() => handleDelete(index)}>
                                <i className="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <div className="clearfix">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <a onClick={previousPage} disabled={currentPage === 1} className="page-link">Previous</a>
                    </li>
                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                            <li key={index} className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        ) : (
                            <li key={index} className={`page-item ${currentPage === page ? "active" : ""}`}>
                                <a onClick={() => paginate(page)} className="page-link">
                                    {page}
                                </a>
                            </li>
                        )
                    )}

                    <li className="page-item">
                        <a onClick={nextPage} disabled={currentPage === totalPages} className="page-link">Next</a>
                    </li>
                </ul>
            </div>

            {/* Modal thêm/sửa sinh viên */}
            <StudentModal
                name={form.name}
                email={form.email}
                phone={form.phone}
                indexSelected={indexSelected}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                closeModal={closeModal}
                isValid={isValid}
            />
        </div>
    );
};

export default StudentList;
