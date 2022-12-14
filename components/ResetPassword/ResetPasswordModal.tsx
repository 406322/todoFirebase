import { Modal } from "flowbite-react";
import { useAtom } from 'jotai'
import { userAtom, showResetPasswordAtom } from "../../atoms";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const ResetPasswordModal = () => {

    const [user, setUser] = useAtom(userAtom);
    const [resetPasswordModal, setShowResetPasswordModal] = useAtom(showResetPasswordAtom)

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
                    <ResetPasswordForm />
                </Modal.Body>
            </Modal>
        </>
    )
}
