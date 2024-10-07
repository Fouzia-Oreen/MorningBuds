/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from '../app/user/userSlice';
import { app } from '../firebase';
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
      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write: if
      //       request.resource.size < 2 * 1024 * 1024 &&
      //       request.resource.contentType.matches('image/.*')
      //     }
      //   }
      // }
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
    const handleDeleteUser = async () => {
      setShowModal(false);
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(deleteUserFailure(data.message));
        } else {
          dispatch(deleteUserSuccess(data));
        }
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };
    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
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
          <Button type="button" className=" bg-light-600 hover:bg-light-700 text-white dark:bg-dark-100 hover:dark:bg-dark-200 dark:text-dark-500 duration-200 transition rounded-md  text-md font-medium "  disabled={loading || imageFileUploading}>{loading ? "Loading" : "Update"}</Button>
          {
            currentUser.isAdmin && (
              <Link to={'/create-post'}>
              <Button type='button' className=' bg-light-800 hover:bg-light-700 text-white dark:bg-dark-100 hover:dark:bg-dark-200 dark:text-dark-500 duration-200 transition  rounded-md  text-md font-medium'>Create a post</Button>
              </Link>
            )
          }
          </div>
        </form>
        <div className="flex items-center justify-between gap-12 font-semibold">
          <span className="cursor-pointer text-red-700" onClick={() => setShowModal(true)}>Delete Account</span>
          <span className="cursor-pointer" onClick={handleSignout}>Sign Out</span>
        </div>
        {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal 
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header className='bg-dark-500 '/>
        <Modal.Body className='bg-dark-500'>
          <div className='text-center '>
            <HiOutlineExclamationCircle className='h-14 w-14 text-light-600 dark:text-dark-100 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-light-800 dark:text-dark-100'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I&apos;m sure
              </Button>
              <Button className='bg-dark-200' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div> 
      </section>
    )
}

export default DashProfile


