import Sidebar from "../components/Sidebar"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

export default function User() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(((response) => {
                console.log(response.data);
                setUsers(response.data);
            }))
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data)
                } else {
                    console.log(error.message)
                }
            })
    }, [])

    return (
        <div className="flex flex-row">
            <Sidebar page="user" />
            <div className="w-full bg-gray-100">
                <div className="h-16 bg-white"></div>
                <div className="m-6">
                    <h1 className="font-semibold text-2xl">Users</h1>
                    <table className="bg-white w-full mt-2 rounded-lg shadow-sm  text-sm text-left">
                        <thead className="text-sm h-12">
                            <tr className="border-b h-16">
                                <th className="w-1/12 text-indent-md">ID</th>
                                <th className="w-1/12 text-indent-md ">Avatar</th>
                                <th className="w-2/12 text-indent-md">Name</th>
                                <th className="w-2/12 text-indent-md">Email</th>
                                <th className="w-2/12 text-indent-md">Phone</th>
                                <th className="w-2/12 text-indent-md px-2">Website</th>
                                <th className="w-1/12 text-indent-md">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) && users.length > 0 && users.map((user, index) => {
                                return (
                                    <tr className="h-16 border border-b-gray-300">
                                        <td className="w-1/12 text-indent-md">{index + 1}</td>
                                        <td className="w-1/12 text-center align-middle">
                                            <img src={`https://ui-avatars.com/api/?rounded=true&name=${user.name}&size=36&background=random`} className=" pl-4" ></img>
                                        </td>
                                        <td className="w-2/12 text-indent">{user.name}</td>
                                        <td className="w-2/12 text-indent-md text-blue-600">
                                            <a href={`mailto:${user.email}`} className="text-blue-500">{user.email}</a>
                                        </td>
                                        <td className="w-2/12 text-indent-md text-blue-600">
                                            <a href={`tel:${user.phone}`} className="text-blue-500">{user.phone}</a>
                                        </td>
                                        <td className="w-1/12 text-indent-md text-blue-600 px-2">
                                        <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{user.website}</a>
                                        </td>
                                        <td className="w-1/12 text-indent-md">
                                            <button>
                                                <div className="border border-gray-400 px-1 rounded-md outline-none hover:border-blue-500 hover:text-blue-500"
                                                    onClick={() => { navigate(`/user/${user.id}`) }}
                                                >
                                                    <span> <FontAwesomeIcon icon={faEye} /> </span><span>Show</span>
                                                </div>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>



            </div>
        </div>
    )
}