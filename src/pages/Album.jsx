import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Album() {
    const [albums, setAlbums] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentAlbums, setCurrentAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage, setAlbumsPerPage] = useState(20);
    const [totalPage, setTotalPage] = useState(0);

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = () => {
            axios.get(`https://jsonplaceholder.typicode.com/albums`)
                .then((response) => {
                    const albumsData = response.data;
                    console.log(albumsData);
                    setAlbums(albumsData);
                    const currentAlbumData = albumsData.slice(0, 20);
                    setCurrentAlbums(currentAlbumData);
                    setTotalPage(5);
                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data);
                    } else {
                        console.log(error.message);
                    }
                })
            axios.get(`https://jsonplaceholder.typicode.com/users`)
                .then((response) => {
                    const usersData = response.data;
                    setUsers(usersData);
                    console.log("CHECK USERS: ", usersData)
                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data);
                    } else {
                        console.log(error.message);
                    }
                })
        }
        fetchData();
    }, []);

    // FUNTION
    function handlePageClick(pageNum) {
        setCurrentPage(pageNum);
        const newCurrentAlbums = albums.slice((pageNum - 1) * albumsPerPage, pageNum * albumsPerPage);
        setCurrentAlbums(newCurrentAlbums);
        setCurrentPage(pageNum)
        console.log("Check new page: ", currentAlbums);
    }

    function hanldeChangeNumRecord(e) {
        const numRecord = e.target.value;
        setAlbumsPerPage(numRecord);
        const newCurrentAlbums = albums.slice(0, numRecord);
        setCurrentAlbums(newCurrentAlbums);
        setTotalPage(Math.ceil(albums.length / numRecord));
        setCurrentPage(1);  
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-row">
                <Sidebar page="album" />
                <div className="bg-gray-100 w-full">
                    <div className="bg-white h-16"></div>
                    <div className="m-6">
                        <table className="w-full bg-white  ">
                            <thead>
                                <tr className="h-16 text-left border border-b-gray-300">
                                    <th className="font-semibold w-1/12 px-6">ID</th>
                                    <th className="font-semibold w-7/12">Title</th>
                                    <th className="font-semibold w-2/12">User</th>
                                    <th className="font-semibold w-2/12">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(currentAlbums) && users.length > 0 && currentAlbums.length>0 && currentAlbums.map((album, index) => {
                                    const user = users.find(user => user.id === album.userId);  
                                    return (

                                        <tr className="h-16 text-left text-sm border border-b-gray-300" key={album.id}>
                                            <td className="px-6">{(currentPage - 1) * albumsPerPage + (index + 1)}</td>
                                            <td className="">{album.title}</td>
                                            <td className=" flex space-x-2 h-16 items-center">
                                                <span>
                                                    <img src={`https://ui-avatars.com/api/?rounded=true&name=${user.name}&size=36&background=random`}></img>
                                                </span>
                                                <span>
                                                    {user.name}
                                                </span>
                                                
                                                </td>
                                            <td className="">
                                                <button> 
                                                    <div className="border border-gray-400 px-1 rounded-md outline-none hover:border-blue-500 hover:text-blue-500"
                                                        onClick={() => {navigate(`/album/${album.id}`)}}
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

                        <div className="justify-end my-4 flex space-x-2 text-sm">
                            {Array.from({ length: totalPage ? totalPage : null }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageClick(index + 1)}
                                    className={` w-8 h-8 rounded-md border-none outline-none ${currentPage === index + 1 ? 'bg-blue-100' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <div className=" items-center text-sm">
                                <select name="numRecord" id="numRecored" className="w-full h-full px-2 outline-none border rounded-md hover:border-blue-500 transition duration-300"
                                    onChange={((e) => hanldeChangeNumRecord(e))}
                                >
                                    <option className="bg-white  hover:text-blue-500 transition duration-300" value="10">10 / page</option>
                                    <option className="bg-whit hover:text-blue-500 transition duration-300" value="20">20 / page</option>
                                    <option className="bg-whit hover:text-blue-500 transition duration-300" value="50">50 / page</option>
                                    <option className="bg-whit hover:text-blue-500 transition duration-300" value="100">100 / page</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="ml-6 mt-6 bg-white">

                    </div>

                </div>
            </div>
        </div>
    )

}