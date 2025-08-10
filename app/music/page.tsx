"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";

export default function MusicPage() {
    const topTracks = [
        { name: "Bohemian Rhapsody", artist: "Queen", plays: 1247 },
        { name: "Stairway to Heaven", artist: "Led Zeppelin", plays: 1134 },
        { name: "Hotel California", artist: "Eagles", plays: 987 },
        { name: "Imagine", artist: "John Lennon", plays: 876 },
        { name: "Smells Like Teen Spirit", artist: "Nirvana", plays: 743 },
    ];

    const topGenres = [
        { name: "Classic Rock", percentage: 35 },
        { name: "Alternative", percentage: 25 },
        { name: "Pop", percentage: 20 },
        { name: "Electronic", percentage: 12 },
        { name: "Jazz", percentage: 8 },
    ];

    const listeningStats = [
        { label: "Total Hours", value: "2,847", icon: "⏱️" },
        { label: "Unique Artists", value: "342", icon: "🎤" },
        { label: "Favorite Decade", value: "70s-80s", icon: "📻" },
        { label: "Top Mood", value: "Energetic", icon: "⚡" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-purple-50/30 to-pink-50/40 dark:from-background dark:via-purple-950/30 dark:to-pink-950/40">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <Button
                        as="a"
                        href="/"
                        variant="bordered"
                        className="mb-4"
                        size="sm"
                    >
                        ← Back to Home
                    </Button>
                    <h1 className="text-3xl font-bold mb-2">🎵 Music Stats</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        My musical journey and listening habits
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {listeningStats.map((stat) => (
                        <Card key={stat.label} shadow="lg" className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105 transition-transform">
                            <CardBody className="text-center">
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <h3 className="text-xl font-bold mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Tracks */}
                    <Card shadow="lg" className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span>🎵</span>
                                Top Tracks
                            </h2>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <div className="space-y-3">
                                {topTracks.map((track, index) => (
                                    <div key={track.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{track.name}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-300">{track.artist}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{track.plays}</p>
                                            <p className="text-xs text-gray-500">plays</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Top Genres */}
                    <Card shadow="lg" className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span>🎸</span>
                                Top Genres
                            </h2>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <div className="space-y-4">
                                {topGenres.map((genre, index) => (
                                    <div key={genre.name} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm">{genre.name}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">{genre.percentage}%</span>
                                        </div>
                                        <Progress
                                            value={genre.percentage}
                                            color={
                                                index === 0 ? 'primary' :
                                                index === 1 ? 'secondary' :
                                                index === 2 ? 'success' :
                                                index === 3 ? 'warning' : 'danger'
                                            }
                                            size="sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Current Mood Section */}
                <Card shadow="lg" className="mt-8 p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                    <CardBody className="text-center">
                        <h2 className="text-xl font-bold mb-4">🎧 Currently Listening</h2>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                                🎵
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-lg">"Bohemian Rhapsody"</p>
                                <p className="opacity-90">Queen • A Night at the Opera</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-2 mb-4">
                            <Chip size="sm" className="bg-white/20 text-white">Classic Rock</Chip>
                            <Chip size="sm" className="bg-white/20 text-white">Epic</Chip>
                            <Chip size="sm" className="bg-white/20 text-white">Masterpiece</Chip>
                        </div>
                        <Button
                            as="a"
                            href="https://open.spotify.com"
                            target="_blank"
                            className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                            size="lg"
                        >
                            🎵 Listen on Spotify
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
