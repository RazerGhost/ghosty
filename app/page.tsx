"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Avatar } from "@heroui/avatar";

export default function Home() {

    const skills = [
        { name: 'PHP', level: 'Advanced', percentage: 85 },
        { name: 'WordPress', level: 'Expert', percentage: 90 },
        { name: 'Laravel', level: 'Advanced', percentage: 80 },
        { name: 'MySQL/MariaDB', level: 'Advanced', percentage: 85 },
        { name: 'JavaScript', level: 'Advanced', percentage: 85 },
        { name: 'React', level: 'Advanced', percentage: 80 },
        { name: 'HTML & CSS', level: 'Expert', percentage: 90 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-primary-50/30 to-secondary-50/40 dark:from-background dark:via-primary-950/30 dark:to-secondary-950/40">

            {/* Full Width Bento Grid Layout */}
            <div className="w-full px-2 sm:px-4 lg:px-2 py-2">

                {/* Main Bento Grid Container - Creative 4x4 Layout */}
                <div className="grid grid-cols-4 grid-rows-4 gap-2 min-h-screen auto-rows-[minmax(120px,1fr)]">

                    {/* Row 1 - Hero Profile spans 2x2 */}
                    <Card shadow="lg" className="col-span-2 row-span-2 p-3 hover:scale-105 transition-transform">
                        <CardBody className="flex flex-col justify-center h-full text-center">
                            <Avatar
                                size="lg"
                                name="DJ"
                                className="w-16 h-16 mx-auto mb-3 text-xl font-bold"
                            />
                            <h1 className="text-2xl font-bold mb-2">Dimitri de Jong</h1>
                            <p className="text-lg mb-2">Full-Stack Developer</p>
                            <p className="text-sm mb-3">WordPress Specialist & React Developer</p>

                            <div className="flex gap-2 justify-center">
                                <Button
                                    as="a"
                                    href="/projects"
                                    size="md"
                                    color="primary"
                                >
                                    Projects
                                </Button>
                                <Button
                                    as="a"
                                    href="#contact"
                                    size="md"
                                    variant="bordered"
                                    color="primary"
                                >
                                    Contact
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Stats - 2 cards spanning top right */}
                    <Card shadow="lg" className="col-span-1 row-span-1 p-2 hover:scale-105 transition-transform">
                        <CardBody className="text-center flex flex-col justify-center h-full">
                            <h3 className="text-3xl font-bold">2+</h3>
                            <p className="text-base">Years Experience</p>
                        </CardBody>
                    </Card>

                    <Card shadow="lg" className="col-span-1 row-span-1 p-2 hover:scale-105 transition-transform">
                        <CardBody className="text-center flex flex-col justify-center h-full">
                            <h3 className="text-3xl font-bold">15+</h3>
                            <p className="text-base">Projects Built</p>
                        </CardBody>
                    </Card>

                    {/* Status and Music - bottom right of hero section */}
                    <Card shadow="lg" className="col-span-1 row-span-1 p-2 hover:scale-105 transition-transform">
                        <CardBody className="text-center flex flex-col justify-center h-full">
                            <div className="text-3xl mb-2">🟢</div>
                            <p className="text-base font-bold">Available</p>
                            <p className="text-sm">for hire</p>
                        </CardBody>
                    </Card>

                    <Card shadow="lg" className="col-span-1 row-span-1 p-2 hover:scale-105 transition-transform">
                        <CardBody className="flex flex-col justify-center h-full text-center">
                            <div className="text-2xl mb-1">🎵</div>
                            <p className="text-sm font-bold mb-1">Now Playing</p>
                            <p className="text-xs">"Bohemian Rhapsody"</p>
                        </CardBody>
                    </Card>

                    {/* Row 3-4 - Content Grid */}
                    <Card shadow="lg" className="col-span-2 row-span-1 p-3 hover-card">
                        <CardBody className="flex flex-col justify-center h-full">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span>🛠️</span>
                                Tech Stack
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {['PHP', 'WordPress', 'Laravel', 'React', 'JavaScript', 'MySQL'].map((tech, index) => (
                                    <div key={tech} className="text-center p-2 rounded-lg bg-default-100">
                                        <span className="text-base font-medium">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>

                    <Card shadow="lg" className="col-span-1 row-span-2 p-3 hover:scale-105 transition-transform cursor-pointer">
                        <CardBody className="flex flex-col justify-center h-full text-center">
                            <div className="text-4xl mb-3">🚀</div>
                            <h3 className="text-xl font-bold mb-2">Projects</h3>
                            <p className="text-base mb-3">WordPress plugins to full-stack apps</p>
                            <Button
                                as="a"
                                href="/projects"
                                color="primary"
                                size="md"
                            >
                                View All →
                            </Button>
                        </CardBody>
                    </Card>

                    <Card shadow="lg" className="col-span-1 row-span-2 p-3 hover:scale-105 transition-transform cursor-pointer">
                        <CardBody className="flex flex-col justify-center h-full text-center">
                            <div className="text-4xl mb-3">🎵</div>
                            <h3 className="text-xl font-bold mb-2">Music</h3>
                            <p className="text-base mb-3">Stats & playlists</p>
                            <Button
                                as="a"
                                href="/music"
                                color="secondary"
                                size="md"
                            >
                                Explore →
                            </Button>
                        </CardBody>
                    </Card>

                    <Card shadow="lg" className="col-span-1 row-span-1 p-3 hover-card">
                        <CardBody className="flex flex-col justify-center h-full">
                            <h4 className="text-lg font-bold mb-2 flex items-center gap-1">
                                <span>👋</span>
                                About
                            </h4>
                            <p className="text-sm leading-relaxed">
                                Passionate developer helping businesses establish their online presence.
                            </p>
                        </CardBody>
                    </Card>

                    <Card shadow="lg" className="col-span-1 row-span-1 p-3 hover:scale-105 transition-transform">
                        <CardBody className="flex flex-col justify-center h-full text-center">
                            <div className="text-2xl mb-2">💬</div>
                            <h4 className="text-base font-bold mb-2">Let's Connect</h4>
                            <div className="space-y-1">
                                <Button
                                    as="a"
                                    href="https://rg-digital.xyz/contact"
                                    target="_blank"
                                    color="primary"
                                    variant="bordered"
                                    className="w-full"
                                    size="sm"
                                >
                                    Contact
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
