import { useEffect, useState } from "react";
import { useToast, type Toast } from "../../context/ToastContext";
import { X, CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

const icons = {
    success: <CheckCircle size={18} className="shrink-0" />,
    error: <XCircle size={18} className="shrink-0" />,
    warning: <AlertTriangle size={18} className="shrink-0" />,
    info: <Info size={18} className="shrink-0" />,
};

const styles = {
    success: "bg-green-600 text-white border-green-500",
    error: "bg-red-600   text-white border-red-500",
    warning: "bg-yellow-500 text-white border-yellow-400",
    info: "bg-indigo-600 text-white border-indigo-500",
};

function ToastItem({ toast }: { toast: Toast }) {
    const { removeToast } = useToast();
    const [visible, setVisible] = useState(false);
    const duration = toast.duration ?? 3500;

    useEffect(() => {
        // Megjelenési animáció
        const showTimer = setTimeout(() => setVisible(true), 10);
        // Eltűnési animáció: 300ms-el a tényleges törlés előtt indul
        const hideTimer = setTimeout(() => setVisible(false), duration - 300);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [duration]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => removeToast(toast.id), 300);
    };

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl
                min-w-[260px] max-w-[360px] text-sm font-medium
                transition-all duration-300
                ${styles[toast.type]}
                ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
      `}
        >
            {icons[toast.type]}
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
                onClick={handleClose}
                className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Bezárás"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default function ToastContainer() {
    const { toasts } = useToast();

    return (
        <div
            className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 items-end pointer-events-none"
            aria-live="polite"
        >
            {toasts.map(t => (
                <div key={t.id} className="pointer-events-auto">
                    <ToastItem toast={t} />
                </div>
            ))}
        </div>
    );
}
