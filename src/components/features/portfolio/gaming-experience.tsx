'use client';

import { motion } from 'framer-motion';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Building, Calendar, MapPin, TrendingUp, DollarSign, Zap, Target, Database } from 'lucide-react';
import Image from 'next/image';
// import { getMetricColor, slideUpVariants, createStaggerVariants, smoothTransition } from '@/lib';

// Live status indicator component
const LiveIndicator = () => (
  <motion.div
    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="w-2 h-2 bg-green-500 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <span className="text-xs font-medium">CURRENT</span>
  </motion.div>
);

const experience = [
  {
    title: "Senior Data Engineer Consultant",
    company: "Twoday",
    period: "October 2022 - Present",
    location: "Helsinki, Finland",
    logo: "https://logo.clearbit.com/twoday.com",
    fallbackLogo: "/logos/twoday.png",
    highlights: [
      "Lead Data & Analytics solution delivery across multiple enterprise clients simultaneously",
      "Act as primary interface between business stakeholders and technical teams throughout the full project lifecycle",
      "Designed and delivered end-to-end data solutions handling 10TB+ daily on Azure and Databricks",
      "Mentored and onboarded junior engineers, establishing documentation and configuration standards"
    ],
    keyProjects: [
      "End-to-end data solutions spanning requirements, architecture, configuration, testing, and production rollout",
      "Collaboration with solution architects, data scientists, analysts, and product partners on technical designs",
      "Dimensional modelling and Data Vault implementations for self-service BI",
      "Documentation and configuration standards improving team consistency and knowledge transfer"
    ],
    impactMetrics: {
      "Daily Data Volume": "10TB+",
      "Query Time Reduction": "70%"
    },
    technologies: ["Azure", "Databricks", "Delta Lake", "Apache Spark (PySpark)", "Data Modelling", "Power BI", "SQL"]
  },
  {
    title: "Analytics Engineer",
    company: "Sievo Oy",
    period: "March 2021 - September 2022",
    location: "Helsinki, Finland",
    logo: "https://logo.clearbit.com/sievo.com",
    fallbackLogo: "/logos/sievo.png",
    highlights: [
      "Designed and delivered spend analytics solutions for enterprise procurement clients",
      "Combined data platform development with strategic consultation",
      "Built and maintained robust, version-controlled data pipelines on Azure Data Factory and Azure Synapse Analytics",
      "Developed training materials and led stakeholder sessions to accelerate product adoption"
    ],
    keyAchievements: [
      "Designed spend analytics dashboards in Power BI and Qlik Sense for vendor pattern visibility",
      "Reliable processing of high-volume vendor transaction data",
      "Advanced spend analysis using SQL and Python surfacing cost savings",
      "Identified savings through contract consolidation, spend leakage identification, and supplier optimisation"
    ],
    technologies: ["Power BI", "Qlik Sense", "Azure Data Factory", "Azure Synapse Analytics", "SQL", "Python"]
  }
];


interface GamingExperienceProps {
  data?: {
    experience?: typeof experience;
  };
}

export default function GamingExperience({ data }: GamingExperienceProps) {
  // Use props data if available, otherwise fallback to local data
  const experienceData = data?.experience || experience;
  return (
    <div className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tighter">Working Experience</h2>
        <p className="text-muted-foreground mt-2">
          5+ years of data engineering and analytics across enterprise environments
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-6"
      >
        {experienceData && experienceData.length > 0 ? experienceData.map((role) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="space-y-3 mb-4">
                  {/* Company Info Row */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                        <Image
                          src={role.logo || role.fallbackLogo || ""}
                          alt={`${role.company} logo`}
                          width={40}
                          height={40}
                          className="object-contain"
                          onError={(e) => {
                            // Fallback to building icon if image fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallbackIcon = target.nextSibling as HTMLElement;
                            if (fallbackIcon) fallbackIcon.style.display = 'block';
                          }}
                        />
                        <Building className="h-6 w-6 text-primary hidden" />
                      </div>
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-sm font-medium">{role.company}</Badge>
                    </div>
                  </div>

                  {/* Period and Location Row - Properly Spaced */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{role.period}</span>
                      {role.period.includes('Present') && <LiveIndicator />}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <MapPin className="h-4 w-4" />
                      <span className="whitespace-nowrap">{role.location}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl">{role.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {role.highlights?.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {role.keyProjects && (
                  <div>
                    <h4 className="font-semibold mb-3">Key Projects</h4>
                    <div className="space-y-2">
                      {role.keyProjects?.map((project, idx) => (
                        <div key={idx} className="flex items-start bg-gray-50 dark:bg-gray-950/20 p-3 rounded-lg">
                          <span className="text-gray-600 dark:text-gray-400 mr-2 mt-1 flex-shrink-0">✓</span>
                          <span className="text-sm">{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {role.keyAchievements && (
                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {role.keyAchievements?.map((achievement, idx) => (
                        <div key={idx} className="flex items-start bg-gray-50 dark:bg-gray-950/20 p-3 rounded-lg">
                          <span className="text-gray-600 dark:text-gray-400 mr-2 mt-1">✓</span>
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {role.impactMetrics && (
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      Impact Metrics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(role.impactMetrics).map(([metric, value], index) => {
                        // Icon mapping for different metrics
                        const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                          "Cost Optimization": DollarSign,
                          "Revenue Growth": TrendingUp,
                          "Performance Improvement": Zap,
                          "Infrastructure": Database,
                          "Daily Data Volume": Database,
                          "Query Time Reduction": Zap
                        };
                        const Icon = iconMap[metric] || Target;

                        // Use consistent neutral styling for all metrics
                        const colorClass = "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-300";

                        return (
                          <motion.div
                            key={metric}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 ${colorClass} hover:scale-105 transition-transform duration-200`}
                          >
                            <div className="flex-shrink-0">
                              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                                <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                {value}
                              </div>
                              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                                {metric}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.technologies?.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )) : (
          <div className="text-center text-muted-foreground p-8">
            <p>No experience data available.</p>
          </div>
        )}
      </motion.div>

    </div>
  );
}
