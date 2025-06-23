"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground, FloatingElements } from "@/components/animations/animated-background"
import { GradientButton, ModernButton } from "@/components/ui/gradient-button"
import { MagneticCursor, MagneticElement } from "@/components/animations/magnetic-cursor"
import { ParticleSystem } from "@/components/animations/particle-system"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useI18n } from "@/lib/i18n/hooks"
import {
  Play,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Star,
  TrendingUp,
  Eye,
  GamepadIcon,
  Shield,
  Target,
  Crosshair,
  Upload,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const { t, language } = useI18n()
  const [showParticles, setShowParticles] = useState(false)
  const [currentText, setCurrentText] = useState(0)
  const [featuredVideos] = useState([
    {
      id: 1,
      title: "プロが教える完璧なエイムテクニック",
      author: "FPS_Master_JP",
      thumbnail: "/images/video.webp",
      views: "125K",
      duration: "12:34",
      game: "VALORANT",
      verified: true,
    },
    {
      id: 2,
      title: "LoL世界大会優勝チームの戦術分析",
      author: "eSports_Analyst",
      thumbnail: "/images/video.webp",
      views: "89K",
      duration: "18:45",
      game: "League of Legends",
      verified: true,
    },
    {
      id: 3,
      title: "Apex Legends ランク1位の立ち回り",
      author: "Apex_Legend_Pro",
      thumbnail: "/images/video.webp",
      views: "67K",
      duration: "15:22",
      game: "Apex Legends",
      verified: true,
    },
  ])

  const heroTexts = t("home.heroActions").split(",")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [heroTexts.length])

  return (
    <div className="min-h-screen overflow-hidden" style={{ backgroundImage: "url('/images/landing.jpg')" }}>
      <MagneticCursor />
      <ParticleSystem trigger={showParticles} />
      <AnimatedBackground variant="gaming" />
      <FloatingElements />

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <MagneticElement>
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <GamepadIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
                <div className="hidden sm:block">
                  <motion.span className="text-lg sm:text-xl font-bold text-white" whileHover={{ scale: 1.05 }}>
                    {t("home.title")}
                  </motion.span>
                  <div className="text-xs text-purple-400">{t("home.subtitle")}</div>
                </div>
                <div className="sm:hidden">
                  <motion.span className="text-lg font-bold text-white" whileHover={{ scale: 1.05 }}>
                    GAP
                  </motion.span>
                </div>
              </Link>
            </MagneticElement>

            <nav className="hidden lg:flex items-center gap-6">
              {[
                { nameKey: "navigation.browseVideos", href: "/browse", icon: Play },
                { nameKey: "navigation.uploadVideo", href: "/upload", icon: Upload },
                { nameKey: "common.community", href: "/community", icon: Users },
                { nameKey: "common.leaderboard", href: "/leaderboard", icon: Trophy },
              ].map((item, index) => (
                <motion.div
                  key={item.nameKey}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <MagneticElement strength={0.2}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors relative group px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="hidden xl:inline">{t(item.nameKey)}</span>
                      <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </MagneticElement>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              <MagneticElement>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ModernButton variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
                    <Link href="/login">{t("common.login")}</Link>
                  </ModernButton>
                </motion.div>
              </MagneticElement>

              <MagneticElement>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <GradientButton
                    size="sm"
                    onClick={() => setShowParticles(true)}
                    icon={<Sparkles className="w-4 h-4" />}
                    asChild
                  >
                    <Link href="/register">
                      <span className="hidden sm:inline">{t("home.startFree")}</span>
                      <span className="sm:hidden">{t("common.register")}</span>
                    </Link>
                  </GradientButton>
                </motion.div>
              </MagneticElement>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  <Star className="w-3 h-3 mr-1" />
                  日本No.1ゲーミング分析
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {t("home.heroTitle")}
                </motion.span>
                <br />
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: -90 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  {heroTexts[currentText]}
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {t("home.heroEnd")}
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {t("home.heroDescription")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <MagneticElement>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <GradientButton
                    size="lg"
                    onClick={() => setShowParticles(true)}
                    icon={<ArrowRight className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/register">{t("home.startFree")}</Link>
                  </GradientButton>
                </motion.div>
              </MagneticElement>

              <MagneticElement>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ModernButton
                    variant="outline"
                    size="lg"
                    icon={<Play className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/browse">{t("home.watchDemo")}</Link>
                  </ModernButton>
                </motion.div>
              </MagneticElement>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{t("home.stats.users")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span>{t("home.stats.analyzed")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>{t("home.stats.rating")}</span>
              </div>
            </motion.div>
          </div>

          {/* Featured Videos - Hidden on small screens */}
          <div className="space-y-4 hidden lg:block">
            <motion.h3
              className="text-white font-semibold mb-4 flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <TrendingUp className="w-5 h-5 text-purple-400" />
              {t("home.featuredVideos")}
            </motion.h3>
            {featuredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <MagneticElement>
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-20 sm:w-24 h-12 sm:h-16 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                          <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1">
                            {video.duration}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white/60 text-xs">{video.author}</span>
                            {video.verified && <Shield className="w-3 h-3 text-blue-400" />}
                          </div>
                          <div className="flex items-center gap-3 text-white/60 text-xs">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {video.views}
                            </span>
                            <Badge variant="secondary" className="bg-white/10 text-white/80 text-xs">
                              {video.game}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MagneticElement>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Language Switcher */}
      <div className="sm:hidden fixed bottom-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">{t("home.whyChooseUs")}</h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            最新のAI技術と豊富な機能で、あなたのゲーミングライフを革新します
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: "AI分析エンジン",
              description: "最新のAIがあなたのプレイを詳細分析し、改善点を具体的に提案",
              features: ["リアルタイム分析", "パフォーマンス予測", "カスタム提案"],
              gradient: "from-blue-500 to-cyan-500",
              delay: 0,
            },
            {
              icon: Users,
              title: "プロコミュニティ",
              description: "プロゲーマーや上級者と直接交流し、実戦的なアドバイスを受け取り",
              features: ["プロ認証システム", "メンタリング機能", "チーム募集"],
              gradient: "from-green-500 to-emerald-500",
              delay: 0.1,
            },
            {
              icon: Trophy,
              title: "競技システム",
              description: "リアルタイムランキングと大会システムで競技性を追求",
              features: ["グローバルランキング", "トーナメント", "賞金システム"],
              gradient: "from-yellow-500 to-orange-500",
              delay: 0.2,
            },
            {
              icon: Crosshair,
              title: "専門ツール",
              description: "ゲーム別の専門分析ツールで詳細なパフォーマンス向上を実現",
              features: ["エイム分析", "戦術ボード", "統計ダッシュボード"],
              gradient: "from-purple-500 to-pink-500",
              delay: 0.3,
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
              }}
            >
              <MagneticElement>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                  <CardContent className="p-4 sm:p-6">
                    <motion.div
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>

                    <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-white/70 mb-4 text-sm leading-relaxed">{feature.description}</p>

                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          className="text-white/60 text-sm flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: feature.delay + itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div className="w-1.5 h-1.5 bg-purple-400 rounded-full" whileHover={{ scale: 2 }} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MagneticElement>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-12 sm:py-20 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            今すぐ始めて、明日から違いを実感しよう
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed">
            無料アカウント作成で、すべての基本機能をご利用いただけます。
            <br className="hidden sm:block" />
            プロ機能は30日間無料でお試しください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <MagneticElement>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <GradientButton
                  size="lg"
                  onClick={() => setShowParticles(true)}
                  icon={<Sparkles className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="/register">無料で始める</Link>
                </GradientButton>
              </motion.div>
            </MagneticElement>

            <MagneticElement>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ModernButton
                  variant="outline"
                  size="lg"
                  icon={<Play className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="/browse">デモを見る</Link>
                </ModernButton>
              </motion.div>
            </MagneticElement>
          </div>

          <p className="text-white/60 text-sm">クレジットカード不要 • いつでもキャンセル可能 • 30日間返金保証</p>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <GamepadIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold">{t("home.title")}</span>
              </div>
              <p className="text-white/60 text-sm mb-4">{t("home.subtitle")}</p>
              <div className="flex gap-2">
                {["T", "D", "Y"].map((social, index) => (
                  <MagneticElement key={social} strength={0.1}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      <span className="text-white/60 text-xs">{social}</span>
                    </motion.div>
                  </MagneticElement>
                ))}
              </div>
            </div>

            {[
              {
                title: "プラットフォーム",
                links: ["動画分析", "コミュニティ", "ランキング", "トーナメント"],
              },
              {
                title: "サポート",
                links: ["ヘルプセンター", "お問い合わせ", "API", "開発者向け"],
              },
              {
                title: "会社情報",
                links: ["利用規約", "プライバシーポリシー", "会社概要", "採用情報"],
              },
            ].map((section, index) => (
              <div key={section.title} className="hidden md:block">
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <MagneticElement strength={0.1}>
                        <motion.a
                          href="#"
                          className="text-white/60 hover:text-white text-sm transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {link}
                        </motion.a>
                      </MagneticElement>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">© 2024 GameAnalyzer Pro. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-white/60 text-sm">Made with ❤️ in Japan</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
