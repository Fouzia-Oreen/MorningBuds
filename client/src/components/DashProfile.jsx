/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */


import { getStorage } from 'firebase/storage';
import { app } from '../firebase';
import { Alert, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../app/user/userSlice';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//import {CommonButton} from "./Button"

const DashProfile = () => {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };
    useEffect(() => {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);

    const uploadImage = async () => {
      setImageFileUploading(true);
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            'Could not upload image (File must be less than 2MB)'
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setImageFileUploading(false);
          });
        }
      );
    };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
          setUpdateUserError('No changes made');
          return;
        }
        if (imageFileUploading) {
          setUpdateUserError('Please wait for image to upload');
          return;
        }
        try {
          dispatch(updateStart());
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            dispatch(updateFailure(data.message));
            setUpdateUserError(data.message);
          } else {
            dispatch(updateSuccess(data));
            setUpdateUserSuccess("User's profile updated successfully");
          }
        } catch (error) {
          dispatch(updateFailure(error.message));
          setUpdateUserError(error.message);
        }
      };

    return (
      <section className='h-screen mx-auto  flex  items-center justify-center  bg-slate-300 dark:bg-dark-200 '>
        <div className='py-6 w-full md:w-[70%] md:h-[80%] flex flex-col items-center gap-4 bg-light-500 dark:bg-dark-300 rounded-lg border-[1px] border-light-600 dark:border-dark-100'>
        <h1 className='font-bold text-3xl my-7 dark:text-dark-100'>Profile</h1>
        <form className='flex flex-col gap-12 w-full items-center' onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} className='border-light-700 dark:border-dark-200 border-[1px] rounded-md'/>

          {/* image */}
          <div className=' relative w-32 h-32 self-center cursor-pointer shadow-lg rounded-full' onClick={() => filePickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={ `${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${ imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={` rounded-full w-full h-full border-8 object-cover border-light-600 dark:border-dark-200 ${ imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
          </div>
          {imageFileUploadError && (
             <Alert color='failure'>{imageFileUploadError}</Alert>
          )}

          <div className='flex flex-col items-center gap-6 my-4 w-full  md:w-[500px] '>
          <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50" onChange={handleChange}/>
          <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email}  class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50" onChange={handleChange}/>
          <TextInput type="password" id="password" placeholder="password"  class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50" onChange={handleChange}/>
          <button className=" bg-light-600 hover:bg-light-700 text-white dark:bg-dark-100 hover:dark:bg-dark-200 dark:text-dark-500 duration-200 transition py-2 px-4  rounded-md  text-md font-medium ">Update</button>
          </div>
        </form>
        <div className="flex items-center justify-between gap-12 font-semibold">
          <span className="cursor-pointer text-red-700">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </div> 
      </section>
    )
}

export default DashProfile
// 6096BA

