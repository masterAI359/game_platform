"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MagneticElement } from "@/components/animations/magnetic-cursor"
import { ParticleSystem } from "@/components/animations/particle-system"
import {
  Upload,
  AlertCircle,
  CheckCircle,
  CreditCard,
  FileVideo,
  Sparkles,
  GamepadIcon,
  Star,
  Shield,
  Eye,
  Clock,
  Zap,
  Settings,
  ImageIcon,
} from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [uploadStep, setUploadStep] = useState<"select" | "uploading" | "details" | "payment" | "processing">("select")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [needsPayment, setNeedsPayment] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    game: "",
    tags: "",
    visibility: "public",
    category: "",
    language: "ja",
    thumbnail: null as File | null,
    allowComments: true,
    allowDownload: false,
    ageRestriction: false,
    monetization: false,
  })

  const [uploadStats] = useState({
    totalUploads: "2.5M+",
    avgViews: "15K",
    successRate: "98.5%",
    avgProcessTime: "3分",
  })

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)

    // Check file size (100MB = 104857600 bytes)
    if (file.size > 104857600) {
      setNeedsPayment(true)
      setUploadStep("payment")
    } else {
      setUploadStep("uploading")
      simulateUpload()
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const simulateUpload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => setUploadStep("details"), 500)
      }
      setUploadProgress(progress)
    }, 200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!state.user) return

    setUploadStep("processing")

    // Simulate processing
    setTimeout(() => {
      const newVideo = {
        id: Date.now().toString(),
        title: videoDetails.title,
        description: videoDetails.description,
        game: videoDetails.game,
        author: state.user!.username,
        authorId: state.user!.id,
        authorAvatar: state.user!.avatar,
        thumbnail: "/images/avatar.jpg",
        duration: "1:23",
        views: 0,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString().split("T")[0],
        tags: videoDetails.tags.split(" ").filter((tag) => tag.trim()),
        isLiked: false,
      }

      dispatch({ type: "ADD_VIDEO", payload: newVideo })
      setShowParticles(true)

      setTimeout(() => {
        router.push(`/video/${newVideo.id}/edit`)
      }, 2000)
    }, 3000)
  }

  const handlePayment = () => {
    console.log("Processing payment...")
    setUploadStep("uploading")
    simulateUpload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ParticleSystem trigger={showParticles} />

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <GamepadIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GameAnalyzer Pro</span>
            </Link>
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="/dashboard">ダッシュボードに戻る</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Upload className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">動画をアップロード</h1>
            </div>
            <p className="text-white/70 text-lg">
              ゲームプレイ動画をアップロードして、コミュニティと知識を共有しましょう
            </p>
          </motion.div>

          {/* Upload Stats */}
          <motion.div
            className="grid md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {[
              { label: "総アップロード数", value: uploadStats.totalUploads, icon: FileVideo },
              { label: "平均視聴回数", value: uploadStats.avgViews, icon: Eye },
              { label: "成功率", value: uploadStats.successRate, icon: CheckCircle },
              { label: "平均処理時間", value: uploadStats.avgProcessTime, icon: Clock },
            ].map((stat, index) => (
              <Card key={stat.label} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* File Selection Step */}
          {uploadStep === "select" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <FileVideo className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h2 className="text-white text-2xl font-semibold mb-2">動画ファイルを選択</h2>
                    <p className="text-white/70">MP4, MOV, AVI形式対応 • 最大100MB（無料）• 最大10GB（プレミアム）</p>
                  </div>

                  <MagneticElement>
                    <motion.div
                      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                        dragActive
                          ? "border-purple-400 bg-purple-500/10"
                          : "border-white/20 hover:border-white/40 hover:bg-white/5"
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={{ y: dragActive ? -10 : [0, -10, 0] }}
                        transition={{
                          duration: dragActive ? 0.3 : 2,
                          repeat: dragActive ? 0 : Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Upload className="w-16 h-16 text-white/60 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-white text-lg mb-2">
                        {dragActive ? "ファイルをドロップしてください" : "クリックして動画を選択"}
                      </p>
                      <p className="text-white/60 text-sm">または、ファイルをドラッグ&ドロップ</p>
                    </motion.div>
                  </MagneticElement>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/mov,video/avi"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div className="space-y-3">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        無料プラン
                      </h3>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• 最大100MBまで</li>
                        <li>• 1080p品質</li>
                        <li>• 基本分析機能</li>
                        <li>• コミュニティ共有</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        プレミアムプラン
                      </h3>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• 最大10GBまで</li>
                        <li>• 4K品質対応</li>
                        <li>• AI高度分析</li>
                        <li>• 優先処理</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Payment Step */}
          {uploadStep === "payment" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-white text-2xl font-semibold">プレミアムアップロード</h2>
                  </div>
                  <p className="text-white/70 mb-6">
                    選択したファイルは100MBを超えています。プレミアム機能をご利用ください。
                  </p>

                  {selectedFile && (
                    <motion.div
                      className="bg-white/10 rounded-lg p-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileVideo className="w-8 h-8 text-purple-400" />
                          <div>
                            <p className="text-white font-medium">{selectedFile.name}</p>
                            <p className="text-white/60 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                          大容量ファイル
                        </Badge>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <h3 className="text-white font-semibold">プレミアム（月額）</h3>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">¥980</div>
                        <p className="text-white/70 text-sm mb-4">月額プラン</p>
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• 無制限アップロード</li>
                          <li>• 4K品質対応</li>
                          <li>• AI高度分析</li>
                          <li>• 優先サポート</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                          <h3 className="text-white font-semibold">単発アップロード</h3>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">¥200</div>
                        <p className="text-white/70 text-sm mb-4">1回限り</p>
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• この動画のみ</li>
                          <li>• 高品質処理</li>
                          <li>• 基本分析機能</li>
                          <li>• 24時間サポート</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={() => {
                        setSelectedFile(null)
                        setUploadStep("select")
                      }}
                    >
                      キャンセル
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={handlePayment}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      支払って続行
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Upload Progress Step */}
          {uploadStep === "uploading" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-white text-2xl font-semibold mb-2">アップロード中...</h2>
                    <p className="text-white/70">動画を処理しています。しばらくお待ちください。</p>
                  </div>

                  {selectedFile && (
                    <motion.div
                      className="flex items-center gap-4 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                        <FileVideo className="w-8 h-8 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <p className="text-white/60 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{Math.round(uploadProgress)}%</p>
                        <p className="text-white/60 text-sm">完了</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">アップロード進行状況</span>
                      <span className="text-white">{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-3" />
                    <div className="flex justify-between text-xs text-white/60">
                      <span>開始</span>
                      <span>処理中</span>
                      <span>完了</span>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 font-medium">処理中の機能</span>
                    </div>
                    <ul className="text-blue-200 text-sm space-y-1">
                      <li>• 動画品質の最適化</li>
                      <li>• サムネイル自動生成</li>
                      <li>• メタデータ抽出</li>
                      <li>• セキュリティスキャン</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Video Details Step */}
          {uploadStep === "details" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="basic" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
                    <TabsTrigger value="basic" className="data-[state=active]:bg-white/10 text-white">
                      基本情報
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="data-[state=active]:bg-white/10 text-white">
                      詳細設定
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="data-[state=active]:bg-white/10 text-white">
                      プライバシー
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-purple-400" />
                          <h2 className="text-white text-xl font-semibold">基本情報</h2>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="title" className="text-white">
                              タイトル *
                            </Label>
                            <Input
                              id="title"
                              placeholder="魅力的なタイトルを入力してください"
                              value={videoDetails.title}
                              onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                              required
                            />
                            <p className="text-white/60 text-xs mt-1">{videoDetails.title.length}/100文字</p>
                          </div>

                          <div>
                            <Label htmlFor="description" className="text-white">
                              説明
                            </Label>
                            <Textarea
                              id="description"
                              placeholder="動画の詳細を説明してください"
                              value={videoDetails.description}
                              onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                          </div>

                          <div>
                            <Label htmlFor="game" className="text-white">
                              ゲーム *
                            </Label>
                            <Input
                              id="game"
                              placeholder="ゲームの名前を入力してください"
                              value={videoDetails.game}
                              onChange={(e) => setVideoDetails({ ...videoDetails, game: e.target.value })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="tags" className="text-white">
                              タグ
                            </Label>
                            <Input
                              id="tags"
                              placeholder="タグを入力してください（スペース区切り）"
                              value={videoDetails.tags}
                              onChange={(e) => setVideoDetails({ ...videoDetails, tags: e.target.value })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                          </div>

                          <div>
                            <Label htmlFor="thumbnail" className="text-white">
                              サムネイル
                            </Label>
                            <Input
                              id="thumbnail"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  setVideoDetails({ ...videoDetails, thumbnail: file })
                                }
                              }}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                            {videoDetails.thumbnail && (
                              <div className="mt-2">
                                <ImageIcon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                <p className="text-white font-medium">{videoDetails.thumbnail.name}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Advanced Settings Step */}
                  <TabsContent value="advanced">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Settings className="w-5 h-5 text-purple-400" />
                          <h2 className="text-white text-xl font-semibold">詳細設定</h2>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="category" className="text-white">
                              カテゴリー
                            </Label>
                            <Select
                              id="category"
                              value={videoDetails.category}
                              onValueChange={(value) => setVideoDetails({ ...videoDetails, category: value })}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400">
                                <SelectValue placeholder="カテゴリーを選択してください" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gaming">ゲームプレイ</SelectItem>
                                <SelectItem value="tutorial">チュートリアル</SelectItem>
                                <SelectItem value="review">レビュー</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="language" className="text-white">
                              言語
                            </Label>
                            <Select
                              id="language"
                              value={videoDetails.language}
                              onValueChange={(value) => setVideoDetails({ ...videoDetails, language: value })}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400">
                                <SelectValue placeholder="言語を選択してください" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ja">日本語</SelectItem>
                                <SelectItem value="en">英語</SelectItem>
                                <SelectItem value="zh">中国語</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Privacy Settings Step */}
                  <TabsContent value="privacy">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Shield className="w-5 h-5 text-purple-400" />
                          <h2 className="text-white text-xl font-semibold">プライバシー設定</h2>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={videoDetails.allowComments}
                              onChange={(e) => setVideoDetails({ ...videoDetails, allowComments: e.target.checked })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                            <Label className="text-white">コメントを許可する</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={videoDetails.allowDownload}
                              onChange={(e) => setVideoDetails({ ...videoDetails, allowDownload: e.target.checked })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                            <Label className="text-white">ダウンロードを許可する</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={videoDetails.ageRestriction}
                              onChange={(e) => setVideoDetails({ ...videoDetails, ageRestriction: e.target.checked })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                            <Label className="text-white">年齢制限を適用する</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={videoDetails.monetization}
                              onChange={(e) => setVideoDetails({ ...videoDetails, monetization: e.target.checked })}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                            <Label className="text-white">収益化を有効にする</Label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    アップロードする
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Processing Step */}
          {uploadStep === "processing" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-white text-2xl font-semibold mb-2">処理中...</h2>
                    <p className="text-white/70">動画の分析と処理が行われています。しばらくお待ちください。</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
