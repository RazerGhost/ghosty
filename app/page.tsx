"use client";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Divider } from "@heroui/divider";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Avatar } from "@heroui/avatar";


export default function Home() {

    type MusicTabItem = {
        id: string;
        label: string;
        content: string | string[] | null;
    };

    type ProjectItem = {
        title: string;
        description: string;
        tech: string[];
        status: string;
        link?: string;
    };

    const musicItems: MusicTabItem[] = [
        { id: 'now-playing', label: 'Now Playing', content: '"Bohemian Rhapsody" by Queen' },
        { id: 'top-tracks', label: 'Top Tracks', content: ['Stairway to Heaven - Led Zeppelin', 'Hotel California - Eagles', 'Imagine - John Lennon', 'Smells Like Teen Spirit - Nirvana'] },
        { id: 'playlists', label: 'Playlists', content: null },
    ];

    const skills = [
        { name: 'PHP', level: 'Advanced', percentage: 85 },
        { name: 'WordPress', level: 'Expert', percentage: 90 },
        { name: 'Laravel', level: 'Advanced', percentage: 80 },
        { name: 'MySQL/MariaDB', level: 'Advanced', percentage: 85 },
        { name: 'JavaScript', level: 'Advanced', percentage: 85 },
        { name: 'React', level: 'Advanced', percentage: 80 },
        { name: 'Next.js', level: 'Advanced', percentage: 80 },
        { name: 'HTML & CSS', level: 'Expert', percentage: 90 },
    ];

    const projects: ProjectItem[] = [
        {
            title: 'Proluma WordPress Chatbot',
            description: 'A WordPress chatbot plugin with a wide range of features, showcasing advanced WordPress plugin development skills.',
            tech: ['WordPress', 'PHP', 'React', 'JavaScript'],
            status: 'Live',
            link: 'https://proluma.nl/'
        },
        {
            title: 'Laravel Web Application',
            description: 'A full-stack web application built with Laravel and MySQL for client management, demonstrating backend development expertise.',
            tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
            status: 'Live',
        },
        {
            title: 'WordPress Development Portfolio',
            description: 'Created custom WordPress sites using Oxygen Builder during internship at Raion Design, focusing on modern design and functionality.',
            tech: ['WordPress', 'Oxygen Builder', 'PHP', 'CSS'],
            status: 'Live',
            link: 'https://www.raion-design.com/'
        },
    ];

    return (
        <div className="min-h-screen">

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-secondary-50/40 to-success-50/30 dark:from-background dark:via-primary-950/50 dark:to-secondary-950/50">
                    {/* Floating Elements */}
                    <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 dark:bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-80 dark:opacity-70 animate-float"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-secondary/20 dark:bg-secondary/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-80 dark:opacity-70 animate-float-delayed"></div>
                    <div className="absolute -bottom-8 left-40 w-72 h-72 bg-success/20 dark:bg-success/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-80 dark:opacity-70 animate-float-delayed-2"></div>

                    {/* Additional floating elements for light mode */}
                    <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-warning/15 dark:bg-warning/8 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-60 animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-danger/15 dark:bg-danger/8 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-60 animate-float-delayed"></div>

                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }}>
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:py-40">
                    <div className="text-center">
                        <div className="mb-8 flex justify-center">
                            <Avatar
                                size="lg"
                                name="DJ"
                                className="w-32 h-32 text-4xl font-bold shadow-2xl border-4 border-white dark:border-gray-800"
                                style={{
                                    background: 'linear-gradient(135deg, rgb(var(--heroui-primary-400)) 0%, rgb(var(--heroui-secondary-400)) 100%)',
                                    color: 'white'
                                }}
                            />
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-success-600 bg-clip-text text-transparent mb-6">
                            Dimitri de Jong
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                            Full-Stack Developer & WordPress Specialist
                        </p>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                            Passionate about creating amazing digital experiences with PHP, Laravel, WordPress, and modern React/Next.js technologies
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                as="a"
                                href="#projects"
                                color="primary"
                                size="lg"
                                className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                View My Work
                            </Button>
                            <Button
                                as="a"
                                href="#contact"
                                variant="bordered"
                                size="lg"
                                className="font-semibold px-8 py-3 border-2"
                            >
                                Get In Touch
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

                {/* About Section */}
                <section id="about" className="scroll-mt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            About Me
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Passionate about creating digital solutions that make a difference
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Card shadow="lg" className="p-8 hover:shadow-xl transition-shadow duration-300">
                            <CardBody>
                                <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    I'm a passionate junior developer who recently completed my studies and is excited to help businesses establish their online presence.
                                    My journey started with PHP, HTML, CSS, and JavaScript fundamentals, and I've gained real-world experience through WordPress client work and modern web development projects.
                                </p>
                            </CardBody>
                        </Card>

                        <Card shadow="lg" className="p-8 hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div>
                                    <h3 className="text-2xl font-semibold">RG Digital</h3>
                                    <p className="text-sm text-success-600 font-medium">Founded 2025 • Netherlands</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Specializing in PHP, Laravel, WordPress, and modern frontend development with React and Next.js.
                                    Real-world experience from client projects with competitive pricing and clear communication throughout every project.
                                </p>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    as="a"
                                    href="https://rg-digital.xyz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="primary"
                                    variant="flat"
                                    size="sm"
                                    startContent={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    }
                                >
                                    Visit RG Digital
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </section>

                <Divider className="my-8" />

                {/* Skills Section */}
                <section id="skills" className="scroll-mt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Technical Skills
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Technologies and tools I use to bring ideas to life
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {skills.map((skill, index) => (
                            <Card
                                key={skill.name}
                                shadow="md"
                                className="p-6 hover:shadow-xl transition-all duration-300"
                            >
                                <CardBody className="gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${index % 4 === 0 ? 'bg-gradient-to-br from-primary-400 to-primary-600' :
                                            index % 4 === 1 ? 'bg-gradient-to-br from-secondary-400 to-secondary-600' :
                                                index % 4 === 2 ? 'bg-gradient-to-br from-success-400 to-success-600' :
                                                    'bg-gradient-to-br from-warning-400 to-warning-600'
                                            }`}>
                                            {skill.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-semibold text-lg">{skill.name}</h4>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    {skill.level}
                                                </span>
                                            </div>
                                            <Progress
                                                size="md"
                                                value={skill.percentage}
                                                color={
                                                    index % 4 === 0 ? 'primary' :
                                                        index % 4 === 1 ? 'secondary' :
                                                            index % 4 === 2 ? 'success' :
                                                                'warning'
                                                }
                                                className="w-full"
                                                showValueLabel={true}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="scroll-mt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            A showcase of my recent work and creative solutions
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <Card
                                key={index}
                                shadow="lg"
                                className="group hover:scale-105 transition-all duration-300"
                            >
                                <div className={`h-32 bg-gradient-to-r relative overflow-hidden ${index === 0 ? 'from-blue-500 to-purple-600' :
                                    index === 1 ? 'from-green-500 to-teal-600' :
                                        'from-orange-500 to-red-600'
                                    }`}>
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute top-4 right-4">
                                        <Chip
                                            size="sm"
                                            variant="solid"
                                            color={
                                                project.status === 'Live' ? 'success' :
                                                    project.status === 'Beta' ? 'warning' :
                                                        'primary'
                                            }
                                            className="font-medium"
                                        >
                                            {project.status}
                                        </Chip>
                                    </div>
                                </div>

                                <CardHeader>
                                    <h4 className="text-xl font-semibold">{project.title}</h4>
                                </CardHeader>

                                <CardBody>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <Chip
                                                key={tech}
                                                size="sm"
                                                variant="flat"
                                                color={
                                                    tech.includes('Next.js') || tech.includes('React') ? 'primary' :
                                                        tech.includes('TypeScript') || tech.includes('Node.js') ? 'secondary' :
                                                            tech.includes('PostgreSQL') || tech.includes('MongoDB') ? 'success' :
                                                                'warning'
                                                }
                                                className="text-xs"
                                            >
                                                {tech}
                                            </Chip>
                                        ))}
                                    </div>
                                </CardBody>

                                <CardFooter>
                                    {project.link ? (
                                        <Button
                                            as="a"
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            color="primary"
                                            variant="flat"
                                            className="w-full"
                                            startContent={
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            }
                                        >
                                            View Live Demo
                                        </Button>
                                    ) : (
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            className="w-full"
                                        >
                                            Private Project
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Music Section */}
                <section id="music" className="scroll-mt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Music & Inspiration
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            What fuels my creativity and keeps me motivated
                        </p>
                    </div>

                    <Card shadow="lg" className="p-6">
                        <Tabs
                            items={musicItems}
                            color="primary"
                            variant="underlined"
                            className="w-full"
                        >
                            {(item) => (
                                <Tab key={item.id} title={item.label} className="w-full">
                                    <div className="py-8">
                                        {item.id === 'top-tracks' && Array.isArray(item.content) ? (
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {item.content.map((track, index) => (
                                                    <Card key={track} shadow="sm" className="p-4">
                                                        <CardBody className="flex-row items-center gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                                                                {index + 1}
                                                            </div>
                                                            <p className="font-medium">{track}</p>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : item.id === 'playlists' ? (
                                            <div className="text-center">
                                                <Button
                                                    as="a"
                                                    href="https://open.spotify.com"
                                                    target="_blank"
                                                    color="success"
                                                    size="lg"
                                                    className="font-semibold"
                                                >
                                                    🎵 My Spotify Playlists
                                                </Button>
                                            </div>
                                        ) : (
                                            <Card shadow="sm" className="p-8 text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
                                                <CardBody>
                                                    <div className="text-4xl mb-4">🎵</div>
                                                    <p className="text-2xl font-semibold text-primary-600 dark:text-primary-400">
                                                        {item.content as string}
                                                    </p>
                                                </CardBody>
                                            </Card>
                                        )}
                                    </div>
                                </Tab>
                            )}
                        </Tabs>
                    </Card>
                </section>

                {/* Contact Section */}
                <section id="contact" className="scroll-mt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Let's Work Together
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            Have a project in mind? Visit my main website to get in touch and discuss your next digital project.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <Card shadow="lg" className="p-12 text-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
                            <CardBody>
                                <div className="mb-8">
                                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl font-bold shadow-2xl mb-6">
                                        RG
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                        RG Digital
                                    </h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                        Professional web development, design, and digital solutions.
                                        Ready to transform your ideas into powerful digital experiences.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Button
                                        as="a"
                                        href="https://rg-digital.xyz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color="primary"
                                        size="lg"
                                        className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                                        startContent={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        }
                                    >
                                        Visit RG Digital
                                    </Button>
                                    <Button
                                        as="a"
                                        href="https://rg-digital.xyz/contact"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="bordered"
                                        size="lg"
                                        className="font-semibold px-8 py-3 border-2"
                                        startContent={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        }
                                    >
                                        Get In Touch
                                    </Button>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Professional web development • Digital design • Custom solutions
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
}
