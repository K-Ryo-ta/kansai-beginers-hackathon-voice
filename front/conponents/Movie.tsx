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
    const response = await fetch('http://127.0.0.1:8000/video', {
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
    <div className='border max-height w-7/10'>
      <h1>Movie appload</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>アップロード</button>
      {videoURL && (
        <div>
          <h2>ビデオプレビュー</h2>
          <video controls src={videoURL} width="320" />
        </div>
      )}
    </div>
  );
};

export default Movie;
