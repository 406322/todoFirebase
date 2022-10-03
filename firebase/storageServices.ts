import { auth, storage } from './firebaseConfig'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { updateUserPhoto } from './authServices'




export const submitImage = (event: any) => {
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
                updateUserPhoto(downloadURL)
            });
        }
    );
}