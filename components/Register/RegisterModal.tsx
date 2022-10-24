import { Modal } from "flowbite-react";
import { useAtom } from 'jotai'
import { userAtom, showRegisterModalAtom } from "../../atoms";
import { RegisterForm } from "./RegisterForm";

export const RegisterModal = () => {

    const [user] = useAtom(userAtom);
    const [registerModal, setShowRegisterModal] = useAtom(showRegisterModalAtom)

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
