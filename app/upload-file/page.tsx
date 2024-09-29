'use client'

import { useState, useCallback } from 'react'
import { Upload, Link, Plus, Trash2, X, Copy } from 'lucide-react'

async function uploadFiles(files: File[]): Promise<string[]> {
  const uploadedFiles: string[] = []
  for (const file of files) {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://im.gurl.eu.org/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'accept': 'application/json, text/plain, */*',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (Array.isArray(result) && result.length > 0 && result[0].src) {
        const fileUrl = `https://img.crab6688.cloudns.org${result[0].src}`
        uploadedFiles.push(fileUrl)
      } else {
        throw new Error('无效的响应格式')
      }
    } catch (error) {
      console.error('上传文件时出错:', error)
      throw error
    }
  }
  return uploadedFiles
}

async function downloadAndUploadUrl(url: string): Promise<string> {
  try {
    // 下载文件
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`下载文件失败: ${response.statusText}`)
    }
    const blob = await response.blob()
    const fileName = url.split('/').pop() || 'downloaded_file'
    const file = new File([blob], fileName, { type: blob.type })

    // 上传文件
    const uploadedFiles = await uploadFiles([file])
    return uploadedFiles[0]
  } catch (error) {
    console.error('下载并上传URL时出错:', error)
    throw error
  }
}

export default function UploadFilePage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [files, setFiles] = useState<File[]>([])
  const [urls, setUrls] = useState<string[]>([''])
  const [status, setStatus] = useState<string>('')
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [aiResponse, setAiResponse] = useState<string>('');

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prevFiles => {
        const updatedFiles = [...prevFiles, ...newFiles]
        return updatedFiles.slice(0, 10) // 限制最多10个文件
      })
    }
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }, [])

  const handleUrlChange = useCallback((index: number, value: string) => {
    setUrls(prevUrls => {
      const newUrls = [...prevUrls]
      newUrls[index] = value
      return newUrls
    })
  }, [])

  const addUrlField = useCallback(() => {
    setUrls(prevUrls => [...prevUrls, ''])
  }, [])

  const removeUrlField = useCallback((index: number) => {
    setUrls(prevUrls => prevUrls.filter((_, i) => i !== index))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('处理中...')
    setUploadedFiles([])

    try {
      if (activeTab === 'upload') {
        const uploadedFileUrls = await uploadFiles(files)
        setUploadedFiles(uploadedFileUrls)
        setStatus(`成功上传 ${uploadedFileUrls.length} 个文件`)
      } else {
        const validUrls = urls.filter(url => url.trim() !== '' && isUrlValid(url))
        const uploadPromises = validUrls.map(url => downloadAndUploadUrl(url))
        const uploadedFileUrls = await Promise.all(uploadPromises)
        setUploadedFiles(uploadedFileUrls)
        setStatus(`成功处理 ${uploadedFileUrls.length} 个URL`)
      }
    } catch (error) {
      setStatus('处理过程中出现错误')
      console.error('Error:', error)
    }
  }

  const isUrlValid = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const copyToClipboard = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // 2秒后重置
      console.log('已复制到剪贴板');
    }).catch(err => {
      console.error('复制失败:', err);
    });
  }, []);

  const handleAIRequest = async () => {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelKey: 'cloudflare',
          messages: [
            {
              role: 'system',
              content: '你是一个友好的助手，帮助写故事。',
            },
            {
              role: 'user',
              content: '写一个短故事，关于一只羊驼去寻找橙色云朵的旅程。',
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('AI 请求失败');
      }

      const result = await response.json();
      setAiResponse(result.response);
    } catch (error) {
      console.error('AI 请求错误:', error);
      setAiResponse('处理 AI 请求时出错');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">上传文件</h1>
      
      <div className="mb-4">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'upload'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            文件上传
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'url'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('url')}
          >
            URL转换
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === 'upload' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              上传文件（最多10个）
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">点击上传</span> 或拖拽文件到这里
                  </p>
                  <p className="text-xs text-gray-500">支持任何类型的文件，最多10个</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                  accept="*/*"
                />
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">已选择的文件：</h3>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <span className="text-sm text-gray-600 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-2">
                  共 {files.length} 个文件 {files.length === 10 && '（已达到最大数量）'}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'url' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              图片URL
            </label>
            {urls.map((url, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  className={`flex-grow px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    url && !isUrlValid(url) ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="输入图片URL"
                />
                {index === urls.length - 1 ? (
                  <button
                    type="button"
                    onClick={addUrlField}
                    className="p-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeUrlField(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {activeTab === 'upload' ? '上传文件' : '转换URL'}
        </button>
      </form>

      {status && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-2">{status}</p>
          {uploadedFiles.length > 0 && (
            <ul className="mt-2 space-y-2">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between text-sm text-gray-600 break-all">
                  <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-2">
                    {file}
                  </a>
                  <button
                    onClick={() => copyToClipboard(file, index)}
                    className={`p-1 rounded-md transition duration-150 ease-in-out ${
                      copiedIndex === index
                        ? 'bg-green-500 text-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    }`}
                    title={copiedIndex === index ? "已复制" : "复制链接"}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}