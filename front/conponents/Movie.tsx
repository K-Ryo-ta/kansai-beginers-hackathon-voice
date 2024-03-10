'use client'
// pages/index.tsx
import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';

const Movie = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  };


  async function onSubmit() {
    if (!videoFile) {
      return
    }
    const formData = new FormData()
    formData.append("input", videoFile)
    const response = await fetch('http://127.0.0.1:8000/video/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    console.log(data)
  }

  const handleUpload = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!videoFile) {
      alert('ビデオファイルが選択されていません。');
      return;
    }
    onSubmit()
    // 実際のアプリケーションではここでファイルをサーバーにアップロードします。
    alert('ビデオがアップロードされました！（デモ用）');
  };

  return (
    <div className="border shadow-lg rounded-lg p-6 mx-auto w-7/10">
      <h1 className="text-2xl font-bold mb-4">Movie Upload</h1>
      <div className="mb-4">
        <label htmlFor="video-upload" className="block mb-2 font-medium">
          Select a video file:
        </label>
        <input
          type="file"
          id="video-upload"
          accept="video/*"
          onChange={handleFileChange}
          className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleUpload}
        className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-2"
      >
        Upload
      </button>
      {videoURL && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Video Preview</h2>
          <div className="rounded-md overflow-hidden shadow-md">
            <video controls src={videoURL} width="320" />
          </div>
        </div>
      )}
    </div>
  );
};



export default Movie;
