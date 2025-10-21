"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Link from "next/link";

export default function ProjectsPage() {
  type ProjectItem = {
    title: string;
    description: string;
    tech: string[];
    status: string;
    link?: string;
  };

  const projects: ProjectItem[] = [
    {
      title: "Proluma WordPress Chatbot",
      description:
        "A WordPress chatbot plugin with a wide range of features, showcasing advanced WordPress plugin development skills.",
      tech: ["WordPress", "PHP", "React", "JavaScript"],
      status: "Live",
      link: "https://proluma.nl/",
    },
    {
      title: "Laravel Web Application",
      description:
        "A full-stack web application built with Laravel and MySQL for client management, demonstrating backend development expertise.",
      tech: ["Laravel", "PHP", "MySQL", "JavaScript"],
      status: "Live",
    },
    {
      title: "WordPress Development Portfolio",
      description:
        "Created custom WordPress sites using Oxygen Builder during internship at Raion Design, focusing on modern design and functionality.",
      tech: ["WordPress", "Oxygen Builder", "PHP", "CSS"],
      status: "Live",
      link: "https://www.raion-design.com/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-primary-50/30 to-secondary-50/40 dark:from-background dark:via-primary-950/30 dark:to-secondary-950/40">
      {/* Header */}
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        <div className="mb-6">
          <Link href="/">
            <Button className="mb-4" variant="ghost">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">My Projects</h1>
          <p className="text-gray-600 dark:text-gray-300">
            A showcase of my development work and technical expertise
          </p>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-12 gap-3 auto-rows-[120px]">
          {/* Featured Project - Large */}
          <Card
            className="col-span-12 lg:col-span-8 row-span-3 p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white relative overflow-hidden"
            shadow="lg"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-6 right-6 w-24 h-24 bg-white/20 rounded-full blur-xl " />
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/15 rounded-full blur-lg" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <Chip color="success" size="lg" variant="solid">
                  Featured
                </Chip>
                <Chip
                  className="bg-white/20 text-white"
                  color="default"
                  size="sm"
                  variant="solid"
                >
                  {projects[0].status}
                </Chip>
              </div>

              <CardBody className="p-0">
                <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                  {projects[0].title}
                </h2>
                <p className="text-lg opacity-90 mb-4 leading-relaxed">
                  {projects[0].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[0].tech.map((tech) => (
                    <Chip
                      key={tech}
                      className="bg-white/20 text-white"
                      size="sm"
                    >
                      {tech}
                    </Chip>
                  ))}
                </div>

                {projects[0].link && (
                  <Button
                    as="a"
                    className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                    href={projects[0].link}
                    size="lg"
                    target="_blank"
                  >
                    View Live Project →
                  </Button>
                )}
              </CardBody>
            </div>
          </Card>

          {/* Project Stats */}
          <Card
            className="col-span-6 lg:col-span-2 row-span-1 p-4 bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
            shadow="lg"
          >
            <CardBody className="text-center">
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-xs opacity-90">Live Projects</p>
            </CardBody>
          </Card>

          <Card
            className="col-span-6 lg:col-span-2 row-span-1 p-4 bg-gradient-to-br from-orange-400 to-red-500 text-white"
            shadow="lg"
          >
            <CardBody className="text-center">
              <h3 className="text-2xl font-bold">5+</h3>
              <p className="text-xs opacity-90">Technologies</p>
            </CardBody>
          </Card>

          <Card
            className="col-span-12 lg:col-span-4 row-span-2 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            shadow="lg"
          >
            <CardHeader>
              <h3 className="text-lg font-bold">Tech Stack</h3>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {[
                  "PHP",
                  "WordPress",
                  "Laravel",
                  "React",
                  "JavaScript",
                  "MySQL",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                    <span className="text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* All Projects List */}
          <Card
            className="col-span-12 row-span-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            shadow="lg"
          >
            <CardHeader>
              <h3 className="text-xl font-bold">All Projects</h3>
            </CardHeader>
            <CardBody>
              <div className="grid lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className="hover:scale-105 transition-all duration-300"
                    shadow="sm"
                  >
                    <div
                      className={`h-20 bg-gradient-to-r relative overflow-hidden ${
                        index === 0
                          ? "from-blue-500 to-purple-600"
                          : index === 1
                            ? "from-green-500 to-teal-600"
                            : "from-orange-500 to-red-600"
                      }`}
                    >
                      <div className="absolute top-2 right-2">
                        <Chip color="success" size="sm" variant="solid">
                          {project.status}
                        </Chip>
                      </div>
                    </div>
                    <CardHeader>
                      <h4 className="font-semibold">{project.title}</h4>
                    </CardHeader>
                    <CardBody>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tech.map((tech) => (
                          <Chip
                            key={tech}
                            className="text-xs"
                            color="primary"
                            size="sm"
                            variant="flat"
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
                          className="w-full"
                          color="primary"
                          href={project.link}
                          target="_blank"
                          variant="flat"
                        >
                          View Demo
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          color="default"
                          variant="flat"
                        >
                          Private Project
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Contact CTA */}
          <Card
            className="col-span-12 lg:col-span-6 row-span-2 p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
            shadow="lg"
          >
            <CardBody className="text-center">
              <h3 className="text-xl font-bold mb-3">
                Interested in Working Together?
              </h3>
              <p className="text-sm opacity-90 mb-4">
                Let&apos;s discuss your next project and bring your ideas to
                life.
              </p>
              <div className="space-y-2">
                <Button
                  as="a"
                  className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 w-full"
                  href="https://rg-digital.xyz"
                  target="_blank"
                >
                  Visit RG Digital
                </Button>
                <Button
                  as="a"
                  className="text-white border-white/50 hover:bg-white/20 w-full"
                  href="https://rg-digital.xyz/contact"
                  target="_blank"
                  variant="bordered"
                >
                  Get In Touch
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Back to Home */}
          <Card
            className="col-span-12 lg:col-span-6 row-span-2 p-6 bg-gradient-to-br from-gray-400 to-gray-600 text-white"
            shadow="lg"
          >
            <CardBody className="text-center flex flex-col justify-center">
              <h3 className="text-lg font-bold mb-3">Explore More</h3>
              <p className="text-sm opacity-90 mb-4">
                Check out my skills, music, and more on the main page.
              </p>
              <Link href="/">
                <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 w-full">
                  ← Back to Home
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
