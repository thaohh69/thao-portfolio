'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Database, Cloud, BarChart3, Code, Network } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    {
      category: 'Cloud & Platforms',
      icon: <Cloud className="h-5 w-5" />,
      skills: [
        'Microsoft Fabric',
        'Azure (ADF, Synapse, ADLS)',
        'Databricks',
        'Delta Lake',
        'Apache Spark (PySpark)',
        'Snowflake'
      ],
      color: 'bg-blue-50 text-blue-600 border border-blue-200',
    },
    {
      category: 'Data Architecture',
      icon: <Network className="h-5 w-5" />,
      skills: [
        'Solution Roadmapping',
        'Enterprise Architecture Alignment',
        'Dimensional Modelling',
        'Data Vault'
      ],
      color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    },
    {
      category: 'Data Engineering',
      icon: <Database className="h-5 w-5" />,
      skills: [
        'ETL/ELT Pipelines',
        'Kafka',
        'Airflow',
        'dbt',
        'Real-time Streaming',
        'Batch Pipelines',
        'CI/CD',
        'Data Quality & Schema Validation'
      ],
      color: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
    },
    {
      category: 'BI & Analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      skills: [
        'Power BI',
        'Qlik Sense',
        'Looker'
      ],
      color: 'bg-orange-50 text-orange-600 border border-orange-200',
    },
    {
      category: 'Languages & Tools',
      icon: <Code className="h-5 w-5" />,
      skills: [
        'SQL',
        'Python',
        'R',
        'PostgreSQL',
        'MySQL',
        'Git',
        'Redis'
      ],
      color: 'bg-blue-50 text-blue-600 border border-blue-200',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-5xl rounded-4xl"
    >
      <Card className="w-full border-none px-0 pb-12 shadow-none">
        <CardHeader className="px-0 pb-1">
          <CardTitle className="text-primary px-0 text-4xl font-bold">
            Skills & Expertise
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0">
          <motion.div
            className="space-y-8 px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skillsData.map((section, index) => (
              <motion.div
                key={index}
                className="space-y-3 px-0"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h3 className="text-accent-foreground text-lg font-semibold">
                    {section.category}
                  </h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {section.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      whileHover={{
                        scale: 1.04,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Badge className={`border px-3 py-1.5 font-semibold`}>
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skills;
