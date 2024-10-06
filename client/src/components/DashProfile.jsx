/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */


import { getStorage } from 'firebase/storage';
import { app } from '../firebase';
import { Alert, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//import {CommonButton} from "./Button"

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const filePickerRef = useRef();
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    
    
      const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
          setImageFile(file)
          setImageFileUrl(URL.createObjectURL(file))
        }
      }
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
    

    return (
      <section className='h-screen mx-auto  flex  items-center justify-center  bg-slate-300 dark:bg-dark-200 '>
        <div className='py-6 w-full md:w-[70%] md:h-[80%] flex flex-col items-center gap-4 bg-light-500 dark:bg-dark-300 rounded-lg border-[1px] border-light-600 dark:border-dark-100'>
        <h1 className='font-bold text-3xl my-7 dark:text-dark-100'>Profile</h1>
        <form className='flex flex-col gap-12 w-full items-center'>
          <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} />
          
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
          <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50"/>
          <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email}  class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50"/>
          <TextInput type="password" id="password" placeholder="password"  class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50"/>
          <button className=" bg-light-600 hover:bg-light-700 text-white dark:bg-dark-100 hover:dark:bg-dark-200 dark:text-dark-500 duration-200 transition py-2 px-4  rounded-md  text-md font-medium ">Update</button>
          {/* <CommonButton>{Update}</CommonButton> */}
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

