
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Music", href: "#music" },
        { name: "Contact", href: "#contact" },
    ];

    const skills = [
        "React & Next.js",
        "TypeScript",
        "Node.js",
        "UI/UX Design",
        "Mobile Development",
    ];

    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: "Twitter",
            href: "https://twitter.com",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-background border-t border-divider mt-24">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

                    {/* Personal Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-lg font-bold shadow-lg">
                                DJ
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Dimitri de Jong
                                </h3>
                                <p className="text-sm text-foreground/60">Full-Stack Developer</p>
                            </div>
                        </div>
                        <p className="text-foreground/70 mb-6 max-w-md leading-relaxed">
                            Passionate about crafting beautiful, functional web applications and bringing creative ideas to life through code.
                            Always exploring new technologies and pushing the boundaries of what's possible.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                as="a"
                                href="https://rg-digital.xyz"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="primary"
                                variant="flat"
                                className="font-semibold"
                                startContent={
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                                    </svg>
                                }
                            >
                                Hire Me
                            </Button>
                            <Button
                                as="a"
                                href="#contact"
                                variant="light"
                                className="font-semibold text-foreground/70 hover:text-primary"
                                startContent={
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                }
                            >
                                Let's Chat
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-foreground mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground/70 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Skills */}
                    <div>
                        <h4 className="text-lg font-semibold text-foreground mb-6">
                            Skills
                        </h4>
                        <ul className="space-y-3">
                            {skills.map((skill) => (
                                <li key={skill}>
                                    <span className="text-foreground/70">
                                        {skill}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Divider className="my-12" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Copyright */}
                    <div className="text-center md:text-left">
                        <p className="text-foreground/60 text-sm">
                            © {currentYear} Dimitri de Jong. All rights reserved.
                        </p>
                        <p className="text-foreground/50 text-xs mt-1">
                            Built with Next.js, HeroUI & Tailwind CSS
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-foreground/50 mr-2">
                            Connect with me:
                        </p>
                        {socialLinks.map((social) => (
                            <Button
                                key={social.name}
                                as="a"
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                isIconOnly
                                variant="light"
                                size="sm"
                                className="text-foreground/60 hover:text-primary transition-colors"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Border */}
            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-success"></div>
        </footer>
    );
};
