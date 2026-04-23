import { useState, useEffect, useRef, useCallback } from 'react';
import { useBackgroundRemoval } from './hooks/useBackgroundRemoval';
import { validateImageFile, makeDownloadFilename } from './utils/fileValidation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProcessingPanel from './components/ProcessingPanel';
import FeatureCards from './components/FeatureCards';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  // Uploaded file and its object URL
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedURL, setUploadedURL] = useState<string | null>(null);

  // Result object URL derived from the hook's resultBlob
  const [resultURL, setResultURL] = useState<string | null>(null);

  // Validation error for the upload zone
  const [uploadError, setUploadError] = useState<string | null>(null);

  const toolRef = useRef<HTMLDivElement>(null);

  const { status, progress, progressLabel, resultBlob, error, processImage, reset } =
    useBackgroundRemoval();

  // Create + clean up an object URL for the uploaded file
  useEffect(() => {
    if (!uploadedFile) {
      setUploadedURL(null);
      return;
    }
    const url = URL.createObjectURL(uploadedFile);
    setUploadedURL(url);
    return () => URL.revokeObjectURL(url);
  }, [uploadedFile]);

  // Create + clean up an object URL for the result blob
  useEffect(() => {
    if (!resultBlob) {
      setResultURL(null);
      return;
    }
    const url = URL.createObjectURL(resultBlob);
    setResultURL(url);
    return () => URL.revokeObjectURL(url);
  }, [resultBlob]);

  // Auto-scroll to tool area when a result is ready
  useEffect(() => {
    if (status === 'done') {
      setTimeout(() => {
        toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [status]);

  const handleFileSelect = useCallback(
    (file: File) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setUploadError(validation.error ?? 'Invalid file');
        return;
      }
      setUploadError(null);
      reset();
      setUploadedFile(file);

      // Scroll to the tool section after a tick
      setTimeout(() => {
        toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    },
    [reset]
  );

  const handleProcess = useCallback(() => {
    if (uploadedFile) processImage(uploadedFile);
  }, [uploadedFile, processImage]);

  const handleReset = useCallback(() => {
    reset();
    setUploadedFile(null);
    setUploadError(null);
  }, [reset]);

  const handleDownload = useCallback(() => {
    if (!resultURL || !uploadedFile) return;
    const a = document.createElement('a');
    a.href = resultURL;
    a.download = makeDownloadFilename(uploadedFile.name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [resultURL, uploadedFile]);

  const scrollToTool = useCallback(() => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans">
      <Navbar />

      <main>
        <Hero onUploadClick={scrollToTool} />

        {/* Tool section */}
        <section
          id="tool"
          ref={toolRef}
          className="py-16 px-4 max-w-6xl mx-auto"
        >
          <ProcessingPanel
            uploadedFile={uploadedFile}
            uploadedURL={uploadedURL}
            resultURL={resultURL}
            status={status}
            progress={progress}
            progressLabel={progressLabel}
            processingError={error}
            uploadError={uploadError}
            onFileSelect={handleFileSelect}
            onProcess={handleProcess}
            onReset={handleReset}
            onDownload={handleDownload}
          />
        </section>

        <FeatureCards />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
