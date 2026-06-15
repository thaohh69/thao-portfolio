'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail } from 'lucide-react';
import { SiGithub, SiDiscord, SiMedium } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

export function Contact() {
  // Contact information
  const contactInfo = {
    name: 'Thao Ho',
    email: 'thaohohoang.work@gmail.com',
    handle: '@thao.ho',
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/thao-hoang-ho/',
        icon: FaLinkedin,
        color: '#0A66C2',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/thaohh69',
        icon: SiGithub,
        color: '#181717',
      },
    ],
  };

  // Function to handle opening links
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto mt-8 w-full">
      <div className="bg-accent w-full overflow-hidden rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
            Contact
          </h2>
        </div>

        {/* Humor Section */}
        <div className="mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              Don't be a NULL value in my network!
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              This connection is serverless and cost-effective 💸
            </p>
          </div>
        </div>

        {/* Email Section */}
        <div className="mt-8 flex flex-col md:mt-10">
          <div
            className="group mb-5 cursor-pointer"
            onClick={() => openLink(`mailto:${contactInfo.email}`)}
          >
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-black dark:text-white" />
              <span className="text-base font-medium text-black dark:text-white hover:underline sm:text-lg">
                {contactInfo.email}
              </span>
              <ChevronRight className="h-5 w-5 text-black dark:text-white transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-5 sm:gap-x-8">
            {contactInfo.socials.map((social) => {
              const IconComponent = social.icon;
              return (
                <button
                  key={social.name}
                  className="group flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-110"
                  onClick={() => openLink(social.url)}
                  title={social.name}
                >
                  <IconComponent 
                    className="h-6 w-6 transition-colors duration-200" 
                    style={{ 
                      color: '#6B7280',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = social.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6B7280';
                    }}
                  />
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                    {social.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
