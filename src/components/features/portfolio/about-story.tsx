'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface AboutStoryProps {
  data?: {
    aboutContent?: string;
  };
}

export default function AboutStory({ data }: AboutStoryProps) {
  const content = data?.aboutContent || `# Data Enginner Based In Helsinki

Meet **Thao Ho** – a data engineer who doesn't just ship the pipeline — she also sets up the quality checks, writes the CI/CD, mentors the junior engineer inheriting it, and explains to the stakeholder why the number changed. 

Currently stationed in Helsinki at Twoday, Thao occupies that mystical intersection where Business Intelligence meets Cloud Data Engineering – the place most mortals enter asking "what's a DAX formula?" and leave needing a lie-down. She thrives there, casting \`SELECT * FROM executive_decisions\` and turning C-level eyebrows from furrowed to impressed.

## The Greatest Hits Portfolio

Five-plus years of turning data chaos into boardroom gold, across industries that couldn't be more different if they tried:
- **Manufacturing** - where data pipelines are as important as the physical ones
- **Financial services** - turning risk into insight, one model at a time
- **Retail** - because someone has to explain why Q4 always feels like a miracle
- **Procurement** - finding millions in savings hiding in plain sight inside a QlikSense dashboard


## Full-Stack Data Sorcery

Like a true Nordic Renaissance technologist, Thao commands the complete data lifecycle:
- **Cloud infrastructure**: Azure Data Factory, Synapse, Databricks; basically running a small sky kingdom of data
- **Real-time streaming**: Reducedlatency from hours to minutes, because waiting is so last quarter
- **Data Visualization**: Power BI, Qlik Sense, Looker: making spreadsheets sexier than they have any right to be
- **C-level storytelling**: Translating "Delta Lake Spark cluster throughput anomaly" into "here's why we're making more money"

## Origin Story

It all started at Nokia Technologies, where a young analytics trainee first learned that Power BI and a good story could move mountains (or at least KPI dashboards). From there: procurement intelligence at Sievo Oy, then a full consultancy arc at Twoday – ascending from Consultant to Senior Consultant while somehow also finishing a Master's degree at Aalto University. In Finland. Where winter lasts approximately eleven months.

## When Not Debugging Life

When she's not wrestling with distributed systems or teaching neural networks new tricks, Thao channels his inner warrior through:

**🥋 Gym** – Because sometimes you need to throw problems to the ground before you can solve them

**📸 Photography** – Capturing moments with the same precision she applies to capturing data anomalies

**💻 Creative Programming** – Where art meets algorithms, and beautiful code becomes beautiful... code

## The Bottom Line

In a world drowning in raw data, Thao Ho is your calm, certified, extremely well-credentialed navigator – turning 10TB of daily noise into the exact three numbers an executive needs to make a multi-million euro call. Based in Helsinki, fluent in Azure, and apparently immune to Finnish winter.

*Currently accepting new challenges, data puzzles, and recommendations for the best coffee spots in Helsinki.*`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto py-8 px-6"
    >
      {/* Profile Image Section */}
      <div className="flex justify-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/profile-thao.jpg"
            alt="Thao Ho"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-black dark:text-white">
                {children}
              </h2>
            ),
            p: ({ children }) => (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base md:text-lg">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="space-y-2 mb-6 ml-4">
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-purple-500 mt-1">•</span>
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                {children}
              </strong>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
                {children}
              </code>
            ),
            em: ({ children }) => (
              <em className="italic text-gray-600 dark:text-gray-400">
                {children}
              </em>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
}