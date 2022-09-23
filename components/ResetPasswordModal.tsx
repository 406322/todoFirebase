import { useEffect } from "react";
import { Modal } from "flowbite-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useAtom } from 'jotai'
import { userAtom, showResetPasswordAtom } from "../atoms";

export const ResetPasswordModal = () => {

    const [user, setUser] = useAtom(userAtom);
    const [resetPasswordModal, setShowResetPasswordModal] = useAtom(showResetPasswordAtom)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: User | null) => {
            if (currentUser) { setUser(currentUser) }
        });
    }, [])

    return (
        <>
            <Modal
                show={resetPasswordModal}
                size="md"
                popup={true}
                onClose={() => user && setShowResetPasswordModal(!resetPasswordModal)}
            >
                <Modal.Header />
                <Modal.Body>




                </Modal.Body>
            </Modal>
        </>
    )
}
