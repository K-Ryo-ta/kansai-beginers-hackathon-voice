'use client'
// pages/index.tsx
import { useState, ChangeEvent } from 'react';

const Movie = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  };

  const handleUpload = () => {
    if (!videoFile) {
      alert('ビデオファイルが選択されていません。');
      return;
    }
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
