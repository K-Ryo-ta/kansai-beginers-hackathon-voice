'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// pages/index.tsx
import { useState, ChangeEvent, FormEvent, MouseEvent, useEffect } from 'react';

interface Theme {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
}

async function getData() {
  const res = await fetch('http://127.0.0.1:8000/theme', {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

const Movie = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>("");
  const [title, setTheme] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [url, setStartDate] = useState<string | null>(null);
  const [thumnail, setendDate] = useState<string | null>(null);
  const [themedata, setThemeData] = useState<Theme[] | null>([]);
  const [themeId, setThemeId] = useState<string | null>(null);


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

    if (!title || !description || !description || !thumnail || !themedata || !themeId) {
      console.log('Missing fields');
      console.log("title", title, "description", description, "url", url, "thumnail", thumnail)
      return;
    }

    const payload = {
      title: title,
      description: description,
      url: url, // startDateがDateオブジェクトであることを前提としています
      thumbnail: thumnail, // endDateがDateオブジェクトであることを前提としています
      theme_id: themeId,
      user_id: localStorage.getItem('userID'),
      // theme_idをペイロードに追加する
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/video/description', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const res = await response.json();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpload = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!videoFile) {
      alert('ビデオファイルが選択されていません。');
      return;
    }
    if (!title) {
      console.log('themeが選択されていません。');
      return;
    }
    onSubmit()
    // 実際のアプリケーションではここでファイルをサーバーにアップロードします。
    alert('ビデオがアップロードされました！（デモ用）');
    alert('themeがアップロードされました！（デモ用）');
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value", event.target.value)
    setTheme(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value", event.target.value)
    setDescription(event.target.value);
  };

  const handleURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value", event.target.value)
    setStartDate(event.target.value);
  };

  const handleThumnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value", event.target.value)
    setendDate(event.target.value); // 関数名がsetendDateからsetEndDateに修正されるべきです。
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: Theme[] = await getData();
        setThemeData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleThemeIdChange = (value: string) => {
    console.log(value)
    setThemeId(value);
  };

  return (
    <div>
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
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>Enter your video title, description, and other details</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Title" onChange={handleTitleChange} />
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Description" onChange={handleDescriptionChange} />
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" onChange={handleURLChange} />
                    <Label htmlFor="thumanail">Thumnail</Label>
                    <Input id="thumnail" onChange={handleThumnailChange} />
                    <Select onValueChange={handleThemeIdChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {themedata ? (
                          themedata.map((item: Theme) => {
                            return (
                              <SelectItem key={item.id} value={item.id}>
                                {item.title}
                              </SelectItem>
                            )
                          })
                        ) : null}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleUpload}>Upload and Send</Button>
            </CardFooter>
          </Card>
        </div>
        {videoURL && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Video Preview</h2>
            <div className="rounded-md overflow-hidden shadow-md">
              <video controls src={videoURL} width="320" />
            </div>
          </div>
        )}
      </div>
    </div>

  );
};



export default Movie;
