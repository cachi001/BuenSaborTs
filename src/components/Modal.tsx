import type { ReactNode } from 'react'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    titulo?: string
    children: ReactNode
    }

    export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, titulo, children }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">{titulo}</h2>
            <button
                onClick={onClose}
                className="cursor-pointer text-gray-500 hover:text-gray-700 text-xl font-bold"
                aria-label="Cerrar"
            >
                &times;
            </button>
            </div>

            {/* Content */}
            <div className="p-4">{children}</div>
        </div>
        </div>
    )
}

export default Modal
