"use client"

import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function HeroSection() {
  const trendingTags = ["Product Designer", "AI Engineering", "Devops Engineer"]

  const stats = [
    { number: "50K", label: "Active Jobs", icon: Briefcase },
    { number: "12K", label: "Companies", icon: Building2 },
    { number: "2M", label: "Job Seekers", icon: Users },
    { number: "97%", label: "Satisfaction Rate", icon: Trophy },
  ]

  return (
    <section className="relative overflow-hidden bg-[#09090b] pt-16 pb-24 text-white">
      {/* Background Grid & Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "6.25% 100%",
        }}
      />
      <div className="bg-size:4rem_4rem pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute top-10 left-1/2 h-88 w-88 -translate-x-1/2 rounded-full bg-linear-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-zinc-300 shadow-inner backdrop-blur-md">
          <span className="text-xs">💼</span>
          <span className="font-semibold text-orange-400">50,000+</span> NEW
          JOBS THIS MONTH
        </div>

        {/* Background Globe Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/globe.png"
            alt="Globe illustration"
            fill
            className="object-cover opacity-70"
          />
        </div>

        {/* Headline & Description */}
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl z-10">
          Find Your Dream Job Today
        </h1>
 
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg z-10">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar Container */}
        <div className="mx-auto mb-6 flex max-w-3xl flex-col items-center gap-2 rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-2.5 shadow-2xl backdrop-blur-md sm:flex-row">
          {/* Job Title / Keyword Input */}
          <div className="flex w-full items-center gap-3 border-b border-zinc-800 px-3 py-2 sm:w-1/2 sm:border-r sm:border-b-0">
            <Search className="h-5 w-5 shrink-0 text-zinc-400" />
            <Input
              type="text"
              placeholder="Job title, skill or company"
              className="h-auto border-0 bg-transparent p-0 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Location Input */}
          <div className="flex w-full items-center gap-3 px-3 py-2 sm:w-1/3">
            <MapPin className="h-5 w-5 shrink-0 text-zinc-400" />
            <Input
              type="text"
              placeholder="Location or Remote"
              className="h-auto border-0 bg-transparent p-0 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Search Button */}
          <Button className="h-11 w-full rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 px-6 font-medium text-white shadow-lg transition-all hover:opacity-90 sm:w-auto">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>

        {/* Trending Tags */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
          <span className="mr-1 font-semibold text-zinc-300">
            Trending Position:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              className="rounded-full border border-zinc-600 bg-white px-3 py-1.5 text-black transition-all hover:bg-zinc-800 hover:text-shadow-black"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Globe Arc / Visual separator */}
        <div className="relative pt-12 pb-8">
          <div className="pointer-events-none absolute top-0 left-1/2 h-48 w-full max-w-4xl -translate-x-1/2 rounded-[100%] border-t border-blue-500/30 blur-[1px]" />
          <div className="pointer-events-none absolute top-1 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-[100%] bg-linear-to-b from-indigo-600/20 to-transparent blur-3xl" />

          <p className="relative z-10 mx-auto mb-16 max-w-lg text-lg font-medium text-zinc-300 sm:text-xl">
            Assisting over{" "}
            <span className="font-semibold text-white">15,000 job seekers</span>{" "}
            find their dream positions.
          </p>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-6 text-left shadow-xl backdrop-blur-md transition-all hover:border-zinc-700"
                >
                  <div className="absolute top-4 right-4 text-blue transition-colors group-hover:text-zinc-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mb-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {stat.number}
                  </div>
                  <div className="text-xs font-medium text-zinc-400 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
