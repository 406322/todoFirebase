import { useState } from "react";
import { storage } from '../../firebase/firebaseConfig'
import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";

const Upload = () => {

    const [imgUrl, setImgUrl] = useState<string | null>(null);

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const file = event.target[0]?.files[0]

        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('Permission error')
                        break;
                    case 'storage/canceled':
                        console.log('upload canceled')
                        break;
                    case 'storage/unknown':
                        console.log('unknown error')
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                    console.log('File available at', downloadURL);
                });
            }
        );

    }



    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="p-4 mx-5 mt-4 bg-gray-100 rounded dark:bg-gray-900">
                <input type='file' />
                <button type='submit'>Upload</button>
            </form>

            {
                imgUrl &&
                <img src={imgUrl} alt='uploaded file' height={200} />
            }
        </>

    )
}

export default Upload