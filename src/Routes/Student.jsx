import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import { Select, TableContainer, Table, Thead, Tbody, Tr, Th, Td, } from '@chakra-ui/react'

const Student = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const thText = ['No', 'Full Name', 'Faculty', 'Program Study', 'Option'];

    const filterKey = [...new Set(students.map((el) => el.faculty))];

    const fetchData = () => {
        fetch("http://localhost:3001/student")
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const deleteStudent = (id) => {
        fetch(`http://localhost:3001/student/${id}`, {
            method: "DELETE",
        })
        .then((_) => {
            fetchData();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <NavBar />
            <div>
                <p>
                    All Student
                </p>
                <Select name='filter' data-testid='filter' onChange={(e) => setFilter(e.target.value)}>
                    <option value='All'>All</option>
                    {filterKey.map((faculty, index) => {
                        return (
                            <option key={index} value={faculty}>
                                {faculty}
                            </option>
                        );
                    })}
                </Select>
            </div>
            {loading ? (
                <div>
                    <p> Loading ...</p>
                </div>
            ) : (
                <TableContainer>                
                    <Table id='table-student'>
                        <Thead>
                            <Tr>
                                {thText.map((th, index) => {
                                    return (
                                        <Th key={index}>
                                            {th}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        </Thead>
                        <Tbody id='students-data'>
                                {students
                                .filter((Student) => {
                                    return filter === 'All'
                                    ? students
                                    : students.faculty === filter;
                                })
                                .map((student, index) => {
                                    return (
                                        <Tr key={index} className="">
                                            <Td>
                                                {index + 1}
                                            </Td>
                                            <Td>
                                                <Link to={`/student/${student.id}`}>
                                                    {student.fullname}
                                                </Link>
                                            </Td>
                                            <Td>
                                                {student.faculty}
                                            </Td>
                                            <Td>
                                                {student.programStudy}
                                            </Td>
                                            <Td>
                                                <button className='delete-btn' type='button' data-testid={`delete-${student.id}`} onClick={() => deleteStudent(student.id)}>
                                                    Delete
                                                </button>
                                            </Td>
                                        </Tr>
                                    );
                                })};
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default Student;
