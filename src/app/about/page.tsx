'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center justify-between mb-16"
                >
                    <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                            Hi, I&apos;m Adnan Ansari
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            A passionate Full Stack Developer with expertise in modern web technologies
                            and a focus on creating impactful solutions.
                        </p>
                    </div>
                    <div className="md:w-1/3">
                        <div className="relative w-48 h-48 mx-auto">
                            <Image
                                src="/adnan-picture.jpg"
                                alt="Adnan Ansari"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="rounded-full object-cover shadow-lg border-4 border-blue-500"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Tech Stack Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                            Tech Stack
                        </span>
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                        {[
                            { src: "/1 JS logo.jpg", alt: "JavaScript" },
                            { src: "/2 Ts logo.jpg", alt: "TypeScript" },
                            { src: "/React Logo.jpg", alt: "React" },
                            { src: "/Nextjs logo.jpg", alt: "Next.js" },
                            { src: "/python logo.jpg", alt: "Python" },
                            { src: "/fastApi logo.jpg", alt: "FastAPI" },
                            { src: "/poetry logo.jpg", alt: "Poetry" },
                            { src: "/docker logo.jpg", alt: "Docker" },
                            { src: "/docker compose logo.jpg", alt: "Docker Compose" },
                            { src: "/jupyter notebook logo.jpg", alt: "Jupyter" },
                            { src: "/Gpt logo.jpg", alt: "GPT" },
                            { src: "/Gemini logo.jpg", alt: "Gemini" },
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="bg-gray-800 rounded-lg p-4 transform hover:scale-105 transition-transform duration-200 hover:shadow-lg"
                            >
                                <Image
                                    src={tech.src}
                                    alt={tech.alt}
                                    width={64}
                                    height={64}
                                    className="mx-auto"
                                />
                                <p className="text-center text-sm mt-2 text-gray-400">{tech.alt}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                            Expertise
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4 text-blue-400">Frontend</h3>
                            <p className="text-gray-300">Modern, responsive, and accessible web applications</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">Backend</h3>
                            <p className="text-gray-300">Scalable APIs and robust server-side solutions</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4 text-teal-400">AI Integration</h3>
                            <p className="text-gray-300">Implementing AI solutions in web applications</p>
                        </div>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center"
                >
                    <div className="flex justify-center space-x-6">
                        <Link href="https://github.com/26Adnanansari" target="_blank"
                            className="text-gray-300 hover:text-white transition-colors duration-200">
                            <span className="sr-only">GitHub</span>
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <Link href="https://www.linkedin.com/in/adnan-ansari-b5b6416b/" target="_blank"
                            className="text-gray-300 hover:text-white transition-colors duration-200">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;