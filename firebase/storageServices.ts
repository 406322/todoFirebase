import { storage } from './firebaseConfig'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"


export const uploadToStorage = (file: File) => {
    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise(function (resolve, reject) {
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
                    resolve(downloadURL as string)
                });

            }
        );

    })

}
