import Sidebar from "../components/Sidebar";
import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";    

export default function UserDetail() {
    const { userID } = useParams();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({});
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const useRequest = axios.get(`https://jsonplaceholder.typicode.com/users/${userID}`);
            const albumRequest = axios.get(`https://jsonplaceholder.typicode.com/users/${userID}/albums`);

            const [userResponse, albumResponse] = await Promise.all([useRequest, albumRequest]);
            if (userResponse.status === 200) {
                console.log(userResponse.data);
                setUserDetail(userResponse.data);
            }
            if (albumResponse.status === 200) {
                console.log(albumResponse.data);
                setAlbums(albumResponse.data);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="flex flex-row">
            <Sidebar page="album" />
            <div className="w-full bg-gray-100">
                <div className="bg-white h-16"></div>
                <div className="breadcums ml-6 mt-2">
                    <div className="">
                        <span>
                            <a href="/user" className=" text-gray-700">Users / </a>
                        </span>
                        <span>
                            Show
                        </span>
                    </div>
                    <div className="mt-1">
                        <span className="mr-2 font-normal text-gray-700 hover:bg-gray-200 p-1 rounded-lg" >
                            <FontAwesomeIcon icon={faArrowLeft} onClick={() => { navigate('/user') }} />
                        </span>
                        <span className="text-lg font-semibold">Show Users</span>
                    </div>
                </div>

                <div className="mx-6 mt-4 bg-white rounded-lg shadow-md block p-4 ">
                    <div className="m-2 border boder-gray-300 min-h-44">
                        <div className="user-info flex flex-row m-4 space-x-4 border-b border-b-gray-300 border-spacing-5 pb-6">
                            {userDetail && (
                                <>
                                    <div className="avatar">
                                        <img src={`https://ui-avatars.com/api/?name=John+Doe&rounded=true&size=36&background=random&name=${userDetail.name}`} alt="" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg">{userDetail.name}</div>
                                        <div className="text-blue-600 text-sm">{userDetail.email}</div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="album-info ml-4">
                            <h2 className="font-semibold text-xl">Albums</h2>
                            <table className="bg-white w-full mt-2 rounded-lg shadow-sm  text-sm text-left">
                                <thead className="text-sm h-12">
                                    <tr className="border-b h-16 ">
                                        <th className="w-16 text-indent-md">
                                            <span className="border-r border-right-gray-200 pr-10">ID</span>
                                        </th>
                                        <th className="w-8/12 text-indent-md pr-10">
                                            <span className="border-r border-right-gray-200 block w-full">Title</span>
                                        </th>
                                        <th className="w-3/12 text-indent-md pr-10">
                                            <span className="border-r block w-full">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(albums) && albums.length > 0 && albums.map((album, index) => {
                                        return (
                                            <tr className="h-16 border-b border-b-gray-300">
                                                <td className="w-16 text-indent-md">
                                                    {index + 1}
                                                </td>
                                                <td className="w-8/12 text-indent-md pr-10">
                                                    {album.title}
                                                </td>
                                                <td className="w-3/12 text-indent-md pr-10">
                                                    <button>
                                                        <div className="border border-gray-400 px-1 rounded-md outline-none hover:border-blue-500 hover:text-blue-500"
                                                            onClick={() => { navigate(`/album/${album.id}`) }}
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
            </div>
        </div>
    )
}