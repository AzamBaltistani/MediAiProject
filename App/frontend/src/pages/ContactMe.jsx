import React from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function ContactMe() {
    return (
        <section id="contact" className="py-20 bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Get in <span className="text-blue-500">Touch</span>
                </h2>
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-300 dark:border-slate-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Contact Info */}
                            <div>
                                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <ContactItem
                                        icon={<FaEnvelope className="text-blue-400" />}
                                        label="Email"
                                        value="sikanderazam276@gmail.com"
                                    />
                                    <ContactItem
                                        icon={<FaPhone className="text-blue-400" />}
                                        label="Phone/WhatsApp"
                                        value="+92 318 5836395"
                                    />
                                    <ContactItem
                                        icon={<FaMapMarkerAlt className="text-blue-400" />}
                                        label="Address"
                                        value="Islamabad/Rawalpindi"
                                    />
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-xl font-semibold mb-6">Connect with me</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <SocialLink
                                        href="https://www.linkedin.com/in/sikander-azam-899822265/"
                                        label="LinkedIn"
                                        icon={<FaLinkedin />}
                                    />
                                    <SocialLink
                                        href="https://github.com/AzamBaltistani"
                                        label="GitHub"
                                        icon={<FaGithub />}
                                    />
                                    <SocialLink
                                        href="https://leetcode.com/u/sikanderazam276/"
                                        label="LeetCode"
                                        icon={<SiLeetcode />}
                                    />
                                    <SocialLink
                                        href="https://www.facebook.com/s.azam.baltistani"
                                        label="Facebook"
                                        icon={<FaFacebook />}
                                    />
                                </div>
                                <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Feel free to reach out and contact
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Contact item block (email, phone, location)
function ContactItem({ icon, label, value }) {
    return (
        <div className="flex items-start">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4 text-xl">
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className="text-blue-600 dark:text-blue-300">{value}</p>
            </div>
        </div>
    );
}

// Social link reusable component
function SocialLink({ href, label, icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-slate-200 dark:bg-slate-700/50 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 text-xl text-blue-400">
                {icon}
            </div>
            <span>{label}</span>
        </a>
    );
}
