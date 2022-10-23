import { Modal } from "flowbite-react";
import { useAtom } from 'jotai'
import { userAtom, showLoginModalAtom } from "../../atoms";
import { LoginForm } from "./LoginForm";


export const LoginModal = () => {

    const [user] = useAtom(userAtom);
    const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom)

    return (
        <>
            <Modal
                show={showLoginModal}
                size="md"
                popup={true}
                onClose={() => { user && setShowLoginModal(!showLoginModal) }}
            >
                <Modal.Header />
                <Modal.Body>

                    <LoginForm />

                </Modal.Body>
            </Modal>
        </>
    )
}
