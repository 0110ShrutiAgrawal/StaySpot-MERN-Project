import axios from "axios";
import {useState} from "react";
import Image from "./Image.jsx";

export default function PhotosUploader({addedPhotos,onChange}) {
  const [photoLink,setPhotoLink] = useState('');
  
  async function addPhotoByLink(ev) {
    ev.preventDefault();

      const { data: filename } =await axios.post('/api/upload-by-link', { link: photoLink });
      onChange(prev => {
        return [...prev, filename];
      });
      setPhotoLink('');
  }
  
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-type':'multipart/form-data'}
    }).then(response => {
      const {data:filenames} = response;
      onChange(prev => {
        return [...prev, ...filenames];
      });
    })
  }
  function removePhoto(ev,filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !== filename)]);
  }
  function selectAsMainPhoto(ev,filename) {
    ev.preventDefault();
    onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
  }
  return (
    <>
      <div className="flex gap-2">
        <input value={photoLink}
               onChange={ev => setPhotoLink(ev.target.value)}
               type="text" placeholder={'Add using a link ....jpg'}/>
        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 && addedPhotos.map(link => (
          <div>
            <img className="rounded-2xl"  src={'http://localhost:4000/uploads/'+link} alt=""></img>
            </div>
         
        ))}
      </div>
    </>
  );
}