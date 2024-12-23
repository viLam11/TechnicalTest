import Sidebar from "../components/Sidebar";
import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function AlbumDetail() {
    const { albumID } = useParams();
    const [photos, setPhotos] = useState([]);
    const [album, setAlbum] = useState({});
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const albumRequest = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumID}`);
            const photoRequest = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumID}/photos`)
            const userRequest = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            const [albumResponse, photoResponse, userResponse] = await Promise.all([albumRequest, photoRequest, userRequest]);

            if (albumResponse.status === 200) {
                console.log(albumResponse.data);
                setAlbum(albumResponse.data);
            }
            if (photoResponse.status === 200) {
                console.log(photoResponse.data);
                let photosData = photoResponse.data;
                photosData = photosData.slice(0, 10);
                setPhotos(photosData);
            }
            if (userResponse.status === 200) {
                console.log(userResponse.data);
                setUsers(userResponse.data);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        if (album.userId && users.length > 0) {
            const foundUser = users.find(user => user.id === album.userId);
            setUser(foundUser);
        }
    }, [album, users]);


    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };


    return (
        <div className="flex flex-row">
            <Sidebar page="album" />
            <div className="w-full bg-gray-100">
                <div className="bg-white h-16"></div>
                <div className="breadcums ml-6 mt-2">
                    <div className="">
                        <span>
                            <a href="/album" className=" text-gray-700">Albums / </a>
                        </span>
                        <span>
                            Show
                        </span>
                    </div>
                    <div className="mt-1">
                        <span className="mr-2 font-normal text-gray-700 hover:bg-gray-200 p-1 rounded-lg" >
                            <FontAwesomeIcon icon={faArrowLeft} onClick={() => { navigate('/album') }} />
                        </span>
                        <span className="text-lg font-semibold">Show Album</span>
                    </div>
                </div>

                <div className="mx-6 mt-4 bg-white rounded-lg shadow-md block p-4 ">
                    <div className="m-2 border boder-gray-300 min-h-44">
                        <div className="user-info flex flex-row m-4 space-x-4 border-b border-b-gray-300 border-spacing-5 pb-6">
                            {user && (
                                <>
                                    <div className="avatar">
                                        <img src={`https://ui-avatars.com/api/?name=John+Doe&rounded=true&size=36&background=random&name=${user.name}`} alt="" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-blue-600 text-lg">{user.name}</div>
                                        <div className="text-blue-600 text-sm">{user.email}</div>
                                    </div>
                                </>
                            )}


                        </div>

                        <div className="album-info ml-4">
                            <div className="font-semibold my-2">{album.title}</div>
                            <div className="grid grid-cols-7 gap-2">
                                {photos.map((photo, index) => {
                                    return (
                                        <div key={index} className="">
                                            <img src={photo.url} alt=""
                                                className="cursor-pointer"
                                                onClick={() => openModal(photo.url)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white  w-[600px] h-[600px] flex items-center justify-center">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

        </div>
    )
}