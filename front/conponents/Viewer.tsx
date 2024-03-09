'use client'
import React, { useEffect, useState } from 'react';

// 動画情報を表すインターフェース
interface Video {
  id: number;
  url: string;
}

const VideoViewer: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]); // 動画リストの状態
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0); // 現在表示中の動画のインデックス

  // コンポーネントのマウント時に動画データをフェッチ
  useEffect(() => {
    // DBから動画データを取得するための仮の関数
    const fetchVideos = async () => {
      // 実際のアプリケーションではここでAPIから動画データを取得します
      // 以下はデモ用の静的データ
      const demoVideos: Video[] = [
        { id: 1, url: 'https://example.com/video1.mp4' },
        { id: 2, url: 'https://example.com/video2.mp4' },
        // 他の動画URL...
      ];
      setVideos(demoVideos);
    };

    fetchVideos();
  }, []);

  // 「次へ」ボタンのハンドラ
  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length); // 次の動画に切り替える
  };

  return (
    <div className = 'h-[60vh] ml-[20vh]'>
      {videos.length > 0 && (
        <div className='h-[60vh]'>
          <video key={videos[currentVideoIndex].id} controls autoPlay muted className="h-[80vh] mx-auto" >
            <source src={videos[currentVideoIndex].url} type="video/mp4" />
            お使いのブラウザはビデオタグをサポートしていません。
          </video>
          <button onClick={handleNext}>次へ</button>
        </div>
      )}
    </div>
  );
};
export default VideoViewer;
