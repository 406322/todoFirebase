import { useEffect } from "react";
import { Modal } from "flowbite-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useAtom } from 'jotai'
import { userAtom, showLoginModalAtom, showRegisterModalAtom } from "../atoms";
import { RegisterForm } from "./RegisterForm";

export const RegisterModal = () => {

    const [user, setUser] = useAtom(userAtom);
    const [loginModal, setShowLoginModal] = useAtom(showLoginModalAtom)
    const [registerModal, setShowRegisterModal] = useAtom(showRegisterModalAtom)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: User | null) => {
            if (currentUser) { setUser(currentUser) }
        });
    }, [])

    return (
        <>
            <Modal
                show={registerModal}
                size="md"
                popup={true}
                onClose={() => user && setShowRegisterModal(!registerModal)}
            >
                <Modal.Header />
                <Modal.Body>
                    <RegisterForm />
                </Modal.Body>
            </Modal>
        </>
    )
}
