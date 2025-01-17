export default function ModalContent() {
    return (
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold text-gray-900" id="modal-title">Deactivate
                account</h3>
            <div className="mt-2">
                <p className="text-sm text-gray-500">Are you sure you want to deactivate your
                    account? All of your data will be permanently removed. This action
                    cannot be undone.</p>
            </div>
        </div>
    )
}