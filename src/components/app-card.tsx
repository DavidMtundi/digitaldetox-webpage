"use client"

import { Download, Smartphone, Monitor, Laptop } from "lucide-react"

interface App {
  id: number
  name: string
  description: string
  icon: string
  downloads: number
  platforms: string[]
  downloadUrl: string
  version: string
}

interface AppCardProps {
  app: App
}

const platformIcons = {
  android: Smartphone,
  ios: Smartphone,
  desktop: Monitor,
  web: Laptop
}

const platformColors = {
  android: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  ios: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  desktop: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  web: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
}

export default function AppCard({ app }: AppCardProps) {
  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}k`
    }
    return downloads.toString()
  }

  return (
    <div className="card p-6 hover:scale-105 transition-transform duration-200">
      {/* App Icon and Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{app.icon}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          v{app.version}
        </div>
      </div>

      {/* App Name */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {app.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {app.description}
      </p>

      {/* Platform Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {app.platforms.map((platform) => {
          const IconComponent = platformIcons[platform as keyof typeof platformIcons]
          return (
            <span
              key={platform}
              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${platformColors[platform as keyof typeof platformColors]}`}
            >
              <IconComponent className="h-3 w-3" />
              <span className="capitalize">{platform}</span>
            </span>
          )
        })}
      </div>

      {/* Downloads and Download Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatDownloads(app.downloads)} downloads
        </div>
        <button className="btn-primary text-sm px-4 py-2 flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>
    </div>
  )
}
