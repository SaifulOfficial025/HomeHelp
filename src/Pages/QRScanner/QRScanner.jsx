import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Button from "../../Shared/Button";

function QRScanner() {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const isMounted = useRef(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [scannedResult, setScannedResult] = useState(null);

  useEffect(() => {
    // Prevent double initialization
    if (isMounted.current) return;
    isMounted.current = true;

    const initScanner = async () => {
      await startScanner();
    };

    initScanner();

    return () => {
      const cleanup = async () => {
        await stopScanner();
      };
      cleanup();
    };
  }, []);

  const startScanner = async () => {
    try {
      // Double check to prevent duplicate initialization
      if (html5QrCodeRef.current) {
        return;
      }

      setError(null);

      // Clear any existing content in the qr-reader div
      const readerElement = document.getElementById("qr-reader");
      if (!readerElement) {
        setError("Scanner element not found");
        return;
      }

      readerElement.innerHTML = "";

      // Initialize the scanner
      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = html5QrCode;

      // Start scanning with camera
      await html5QrCode.start(
        { facingMode: "environment" }, // Use back camera on mobile
        {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 }, // Scanning box size
        },
        (decodedText, decodedResult) => {
          // Handle successful scan
          setScannedResult(decodedText);
          handleScanSuccess(decodedText);
        },
        (errorMessage) => {
          // Handle scan errors (can be ignored for continuous scanning)
          // console.log(errorMessage);
        },
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      setError(
        "Failed to start camera. Please ensure camera permissions are granted.",
      );
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
        setIsScanning(false);

        // Clear the qr-reader div content
        const readerElement = document.getElementById("qr-reader");
        if (readerElement) {
          readerElement.innerHTML = "";
        }
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  const handleScanSuccess = (decodedText) => {
    // Stop the scanner (don't wait for it)
    stopScanner();

    // Navigate immediately
    setTimeout(() => {
      // Check if it's a URL
      if (
        decodedText.startsWith("http://") ||
        decodedText.startsWith("https://")
      ) {
        // If it's a property URL from your app, navigate to it
        if (
          decodedText.includes("homehelp") ||
          decodedText.includes("/property_details/")
        ) {
          // Extract property ID or navigate to the URL
          const url = new URL(decodedText);
          const pathname = url.pathname;

          // If it's a property details page, navigate to it
          if (pathname.includes("/property_details/")) {
            navigate(pathname);
          } else {
            // Otherwise, open in new tab
            window.open(decodedText, "_blank");
            navigate(-1);
          }
        } else {
          // External URL, open in new tab
          window.open(decodedText, "_blank");
          navigate(-1);
        }
      } else {
        // If it's not a URL, you might want to display it or handle it differently
        console.log("Scanned data:", decodedText);
        // You could navigate to a property page if it's a property ID
        navigate(`/property_details/${decodedText}`);
      }
    }, 100);
  };

  const handleClose = async () => {
    await stopScanner();
    navigate(-1); // Go back to previous page
  };

  const handleRetry = () => {
    setError(null);
    setScannedResult(null);
    startScanner();
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Scan QR Code</h1>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-slate-700 rounded-full transition"
          aria-label="Close scanner"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* Scanner container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {error ? (
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-red-500 text-lg mb-4">⚠️</div>
              <p className="text-slate-800 mb-4">{error}</p>
              <Button
                color="blue"
                size="md"
                rounded={false}
                onClick={handleRetry}
              >
                Try Again
              </Button>
            </div>
          ) : scannedResult ? (
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-green-500 text-lg mb-4">✓</div>
              <p className="text-slate-800 mb-2">
                QR Code Scanned Successfully!
              </p>
              <p className="text-sm text-slate-500 break-all mb-4">
                {scannedResult}
              </p>
              <p className="text-sm text-slate-600">Redirecting...</p>
            </div>
          ) : (
            <div className="relative">
              {/* QR Scanner */}
              <div id="qr-reader" className="rounded-lg overflow-hidden"></div>

              {/* Instructions */}
              <div className="mt-6 text-center text-white">
                <p className="text-sm">Position the QR code within the frame</p>
                <p className="text-xs text-slate-400 mt-2">
                  Scanning will happen automatically
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer instructions */}
      {!error && !scannedResult && (
        <div className="bg-slate-800 text-white p-4 text-center">
          <p className="text-sm">
            Make sure the QR code is well-lit and in focus
          </p>
        </div>
      )}
    </div>
  );
}

export default QRScanner;
