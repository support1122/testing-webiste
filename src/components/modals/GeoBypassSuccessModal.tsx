"use client";

import React, { useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

interface GeoBypassSuccessModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const GeoBypassSuccessModal: React.FC<GeoBypassSuccessModalProps> = ({
    isVisible,
    onClose,
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        if (isVisible) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
            // Auto-close after 3 seconds
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => {
                clearTimeout(timer);
                document.removeEventListener("keydown", handleEscape);
                document.body.style.overflow = "unset";
            };
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="relative bg-white max-w-md w-full mx-4 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        🎉 Geo-block Bypassed!
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        You've successfully bypassed the geo-restriction! You can now proceed with your action.
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                        <p className="text-green-800 text-sm font-medium">
                            ✨ You're all set! Continue with your signup or booking.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeoBypassSuccessModal;

