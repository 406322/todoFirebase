import { auth } from '../../firebase/firebaseConfig'
import { submitImage } from "../../firebase/storageServices";

const user = auth.currentUser

const Upload = () => {

    return (
        <>
            <form
                onSubmit={submitImage}
                className="p-4 mx-5 mt-4 bg-gray-100 rounded dark:bg-gray-900">
                <input type='file' />
                <button type='submit'>Upload</button>
            </form>

            {
                user?.photoURL &&
                <img src={user?.photoURL} alt='uploaded file' height={200} />
            }
        </>

    )
}

export default Upload