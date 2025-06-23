"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedBackground, FloatingElements } from "@/components/animations/animated-background"
import { MagneticElement } from "@/components/animations/magnetic-cursor"
import { useI18n } from "@/lib/i18n/hooks"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import {
  Search,
  Play,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  TrendingUp,
  Star,
  Shield,
  GamepadIcon,
  FlameIcon as Fire,
  Calendar,
  Users,
  Trophy,
} from "lucide-react"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [activeTab, setActiveTab] = useState("trending")

  const [videos] = useState([
    {
      id: "1",
      title: "プロが教える完璧なエイムテクニック - VALORANT",
      description:
        "世界トップクラスのプロゲーマーが実践するエイム練習方法を詳しく解説。初心者から上級者まで役立つテクニック満載。",
      thumbnail: "/images/video.webp",
      author: "FPS_Master_JP",
      authorAvatar: "/images/avatar.jpg",
      verified: true,
      views: 125000,
      likes: 8900,
      comments: 456,
      duration: "12:34",
      uploadDate: "2024-01-15",
      game: "VALORANT",
      category: "tutorial",
      tags: ["エイム", "練習", "テクニック"],
      difficulty: "中級",
      rating: 4.8,
    },
    {
      id: "2",
      title: "LoL世界大会優勝チームの戦術分析",
      description:
        "2024年世界大会で優勝したチームの戦術を詳細に分析。チームファイトの立ち回りから視界管理まで完全解説。",
      thumbnail: "/images/video.webp",
      author: "eSports_Analyst",
      authorAvatar: "/images/avatar.jpg",
      verified: true,
      views: 89000,
      likes: 6700,
      comments: 234,
      duration: "18:45",
      uploadDate: "2024-01-12",
      game: "League of Legends",
      category: "analysis",
      tags: ["戦術", "プロ", "分析"],
      difficulty: "上級",
      rating: 4.9,
    },
    {
      id: "3",
      title: "Apex Legends ランク1位の立ち回り解説",
      description:
        "現在ランク1位のプレイヤーが実際のゲームプレイを通して立ち回りのコツを解説。ポジショニングの重要性を学ぼう。",
      thumbnail: "/images/video.webp",
      author: "Apex_Legend_Pro",
      authorAvatar: "/images/avatar.jpg",
      verified: true,
      views: 67000,
      likes: 5200,
      comments: 189,
      duration: "15:22",
      uploadDate: "2024-01-10",
      game: "Apex Legends",
      category: "gameplay",
      tags: ["ランク", "立ち回り", "ポジション"],
      difficulty: "上級",
      rating: 4.7,
    },
    {
      id: "4",
      title: "CS2 完全初心者ガイド - 基本操作から戦術まで",
      description: "CS2を始めたばかりの初心者向けの完全ガイド。基本操作から基礎的な戦術まで分かりやすく解説します。",
      thumbnail: "/images/video.webp",
      author: "CS_Teacher",
      authorAvatar: "/images/avatar.jpg",
      verified: false,
      views: 45000,
      likes: 3400,
      comments: 156,
      duration: "25:10",
      uploadDate: "2024-01-08",
      game: "CS2",
      category: "tutorial",
      tags: ["初心者", "基本", "ガイド"],
      difficulty: "初級",
      rating: 4.6,
    },
    {
      id: "5",
      title: "Overwatch 2 新メタ解説 - シーズン8",
      description: "シーズン8で登場した新しいメタゲームを詳しく解説。各ヒーローの役割と効果的な組み合わせを紹介。",
      thumbnail: "/images/video.webp",
      author: "OW2_Meta_Master",
      authorAvatar: "/images/avatar.jpg",
      verified: true,
      views: 78000,
      likes: 5800,
      comments: 267,
      duration: "14:33",
      uploadDate: "2024-01-06",
      game: "Overwatch 2",
      category: "analysis",
      tags: ["メタ", "戦略", "ヒーロー"],
      difficulty: "中級",
      rating: 4.5,
    },
    {
      id: "6",
      title: "Fortnite 建築テクニック上達法",
      description: "プロレベルの建築テクニックを身につけるための練習方法と実戦での活用法を詳しく解説。",
      thumbnail: "/images/video.webp",
      author: "Build_Master",
      authorAvatar: "/images/avatar.jpg",
      verified: false,
      views: 92000,
      likes: 7100,
      comments: 345,
      duration: "16:28",
      uploadDate: "2024-01-04",
      game: "Fortnite",
      category: "tutorial",
      tags: ["建築", "テクニック", "練習"],
      difficulty: "中級",
      rating: 4.4,
    },
  ])

  const [featuredCreators] = useState([
    {
      id: "1",
      name: "FPS_Master_JP",
      avatar: "/images/avatar.jpg",
      verified: true,
      followers: "125K",
      speciality: "FPS全般",
      videos: 89,
      totalViews: "2.1M",
    },
    {
      id: "2",
      name: "eSports_Analyst",
      avatar: "/images/avatar.jpg",
      verified: true,
      followers: "98K",
      speciality: "戦術分析",
      videos: 67,
      totalViews: "1.8M",
    },
    {
      id: "3",
      name: "Apex_Legend_Pro",
      avatar: "/images/avatar.jpg",
      verified: true,
      followers: "87K",
      speciality: "Apex Legends",
      videos: 45,
      totalViews: "1.2M",
    },
  ])

  const [trendingTags] = useState([
    "エイム練習",
    "戦術解説",
    "ランク攻略",
    "プロ解説",
    "初心者向け",
    "メタ分析",
    "テクニック",
    "立ち回り",
  ])

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesGame = selectedGame === "all" || video.game === selectedGame
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    return matchesSearch && matchesGame && matchesCategory
  })

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "views":
        return b.views - a.views
      case "likes":
        return b.likes - a.likes
      case "newest":
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      case "rating":
        return b.rating - a.rating
      default: // trending
        return b.views * 0.3 + b.likes * 0.7 - (a.views * 0.3 + a.likes * 0.7)
    }
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "初級":
        return "bg-green-500/20 text-green-300"
      case "中級":
        return "bg-yellow-500/20 text-yellow-300"
      case "上級":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-cover bg-center backdrop-blur-md" style={{ backgroundImage: "url('/images/browse.jpg')" }}>
      <AnimatedBackground variant="particles" />
      <FloatingElements />

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <GamepadIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GameAnalyzer Pro</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/browse" className="text-white font-medium">
                動画を見る
              </Link>
              <Link href="/upload" className="text-white/80 hover:text-white transition-colors">
                アップロード
              </Link>
              <Link href="/community" className="text-white/80 hover:text-white transition-colors">
                コミュニティ
              </Link>
              <Link href="/leaderboard" className="text-white/80 hover:text-white transition-colors">
                ランキング
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                asChild
              >
                <Link href="/register">新規登録</Link>
              </Button>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            最高のゲーミング動画を
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">発見</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            プロゲーマーの解説から初心者向けガイドまで、あなたのスキルアップに役立つ動画が見つかります
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                placeholder="動画、ゲーム、クリエイターを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="w-full lg:w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="ゲームを選択" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white">
                    すべてのゲーム
                  </SelectItem>
                  <SelectItem value="VALORANT" className="text-white">
                    VALORANT
                  </SelectItem>
                  <SelectItem value="League of Legends" className="text-white">
                    League of Legends
                  </SelectItem>
                  <SelectItem value="Apex Legends" className="text-white">
                    Apex Legends
                  </SelectItem>
                  <SelectItem value="CS2" className="text-white">
                    CS2
                  </SelectItem>
                  <SelectItem value="Overwatch 2" className="text-white">
                    Overwatch 2
                  </SelectItem>
                  <SelectItem value="Fortnite" className="text-white">
                    Fortnite
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-40 bg-white/10 border-white/20 text-white hidden sm:block">
                  <SelectValue placeholder="カテゴリー" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white">
                    すべて
                  </SelectItem>
                  <SelectItem value="tutorial" className="text-white">
                    チュートリアル
                  </SelectItem>
                  <SelectItem value="analysis" className="text-white">
                    分析
                  </SelectItem>
                  <SelectItem value="gameplay" className="text-white">
                    ゲームプレイ
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-32 bg-white/10 border-white/20 text-white hidden md:block">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="trending" className="text-white">
                    トレンド
                  </SelectItem>
                  <SelectItem value="views" className="text-white">
                    視聴回数
                  </SelectItem>
                  <SelectItem value="likes" className="text-white">
                    いいね数
                  </SelectItem>
                  <SelectItem value="newest" className="text-white">
                    新着順
                  </SelectItem>
                  <SelectItem value="rating" className="text-white">
                    評価順
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-white/60 text-sm mr-2">人気タグ:</span>
            {trendingTags.map((tag, index) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white/80 text-xs transition-colors"
              >
                #{tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-white/5 border-white/10">
                <TabsTrigger value="trending" className="data-[state=active]:bg-white/10 text-white">
                  <Fire className="w-4 h-4 mr-2" />
                  トレンド
                </TabsTrigger>
                <TabsTrigger value="latest" className="data-[state=active]:bg-white/10 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  最新
                </TabsTrigger>
                <TabsTrigger value="popular" className="data-[state=active]:bg-white/10 text-white">
                  <Star className="w-4 h-4 mr-2" />
                  人気
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-white text-xl font-semibold">{sortedVideos.length}件の動画が見つかりました</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sortedVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <MagneticElement>
                        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                          <CardContent className="p-0">
                            <Link href={`/video/${video.id}`}>
                              <div className="relative">
                                <Image
                                  src={video.thumbnail || "/images/video.webp"}
                                  alt={video.title}
                                  width={350}
                                  height={200}
                                  className="w-full h-48 object-cover rounded-t-lg"
                                  priority={index < 4}
                                  loading={index < 4 ? "eager" : "lazy"}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  style={{ color: "transparent" }}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-lg">
                                  <Play className="w-12 h-12 text-white" />
                                </div>
                                <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
                                  {video.duration}
                                </Badge>
                                <Badge className={`absolute top-2 left-2 ${getDifficultyColor(video.difficulty)}`}>
                                  {video.difficulty}
                                </Badge>
                                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 rounded px-2 py-1">
                                  <Star className="w-3 h-3 text-yellow-400" />
                                  <span className="text-white text-xs">{video.rating}</span>
                                </div>
                              </div>
                            </Link>
                            <div className="p-4">
                              <Link href={`/video/${video.id}`}>
                                <h3 className="text-white font-semibold mb-2 line-clamp-2 hover:text-purple-300 transition-colors">
                                  {video.title}
                                </h3>
                              </Link>
                              <p className="text-white/70 text-sm mb-3 line-clamp-2">{video.description}</p>

                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={video.authorAvatar || "/images/avatar.jpg"} />
                                  <AvatarFallback>{video.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-1">
                                    <span className="text-white/80 text-sm font-medium">{video.author}</span>
                                    {video.verified && <Shield className="w-3 h-3 text-blue-400" />}
                                  </div>
                                  <div className="text-white/60 text-xs">{video.uploadDate}</div>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
                                <div className="flex items-center gap-4 text-sm text-white/60">
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {video.views.toLocaleString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Heart className="w-3 h-3" />
                                    {video.likes.toLocaleString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MessageCircle className="w-3 h-3" />
                                    {video.comments}
                                  </span>
                                </div>
                                <Badge variant="secondary" className="bg-white/10 text-white/80">
                                  {video.game}
                                </Badge>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {video.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="outline" className="border-white/20 text-white/60 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </MagneticElement>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Featured Creators */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    注目のクリエイター
                  </h3>
                  <div className="space-y-3">
                    {featuredCreators.map((creator, index) => (
                      <motion.div
                        key={creator.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={creator.avatar || "/images/avatar.jpg"} />
                          <AvatarFallback>{creator.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-white font-medium text-sm truncate">{creator.name}</span>
                            {creator.verified && <Shield className="w-3 h-3 text-blue-400" />}
                          </div>
                          <div className="text-white/60 text-xs">{creator.speciality}</div>
                          <div className="text-white/60 text-xs">{creator.followers} フォロワー</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    プラットフォーム統計
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "総動画数", value: "50,000+", icon: Play },
                      { label: "総視聴時間", value: "2.5M時間", icon: Clock },
                      { label: "アクティブユーザー", value: "125K", icon: Users },
                      { label: "クリエイター数", value: "8,500", icon: Star },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{stat.value}</div>
                          <div className="text-white/60 text-xs">{stat.label}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">クリエイターになろう</h3>
                  <p className="text-white/70 text-sm mb-4">
                    あなたの知識とスキルを共有して、コミュニティに貢献しませんか？
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    asChild
                  >
                    <Link href="/upload">動画をアップロード</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
