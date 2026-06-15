import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description:
    'This tool shows my comprehensive resume with detailed work experience, achievements, and professional background.',
  parameters: z.object({}),
  execute: async () => {
    return {
      experience: [
        {
          title: "Senior Data Engineer",
          company: "Amazon Games",
          period: "April 2022 - Present",
          location: "Seattle, WA",
          logo: "https://logo.clearbit.com/amazon.com",
          fallbackLogo: "/logos/amazon-games.png",
          highlights: [
            "Building critical data infrastructure for multiple AAA game titles",
            "Constructing data pipelines from Sony PSN, Microsoft Xbox, and Nintendo APIs",
            "Streamlining data warehouse architecture supporting multiple games",
            "Creating ML models for player behavior prediction and churn analysis"
          ],
          keyProjects: [
            "Real-time data ingestion from gaming platforms",
            "Data warehouse optimization for cross-game analytics",
            "MLOps framework for model deployment",
            "Player Churn Prediction (78.4% accuracy)",
            "BERT-based Sentiment Analysis for game reviews",
            "Multi-platform data integration pipelines",
            "AI automation for data lineage workflows"
          ],
          technologies: ["Python", "SQL", "TypeScript", "Airflow", "AWS", "Tableau", "Machine Learning",
            "Docker"]
        },
        {
          title: "Senior Analyst, Call of Duty Mobile",
          company: "Activision Blizzard",
          period: "July 2020 - April 2022",
          location: "Santa Monica, CA",
          logo: "https://logo.clearbit.com/activision.com",
          fallbackLogo: "/logos/activision-blizzard.png",
          highlights: [
            "Led analytics for one of the world's largest mobile games",
            "Spearheaded cross-functional hypothesis testing and experimentation",
            "Developed analytical frameworks for retention, engagement, and monetization",
            "Led Quality of Service analysis across global infrastructure"
          ],
          keyAchievements: [
            "75% production cost reduction through A/B test optimization",
            "30% revenue increase via player wallet inflation correlation analysis",
            "5 new data centers deployed based on QoS analysis",
            "60% Android & 100% iOS retention improvement through performance analysis"
          ],
          impactMetrics: {
            "Cost Optimization": "75%",
            "Revenue Growth": "+30%",
            "Performance Improvement": "25%",
            "Infrastructure": "5 Centers"
          },
          technologies: ["Python", "SQL", "Airflow", "GCP", "Tableau", "Machine Learning"]
        },
        {
          title: "Analytics Consultant",
          company: "Affine Analytics Inc (Client: Activision Blizzard)",
          period: "June 2017 - June 2020",
          location: "Santa Monica, CA",
          logo: "https://logo.clearbit.com/affineanalytics.com",
          fallbackLogo: "/logos/affine-analytics.png",
          highlights: [
            "Managed team of 3 analysts and led analytics development",
            "Executed comprehensive player behavior and retention analysis",
            "Led battle-pass optimization initiatives",
            "Performed matchmaking analysis and improvements"
          ],
          keyAchievements: [
            "25% seasonal revenue increase through battle-pass optimization",
            "20% progression improvement in seasonal content",
            "25% improvement in match closeness and reduced latency",
            "End-to-end analytics solutions for product lifecycle"
          ],
          technologies: ["Python", "SQL", "Tableau", "Machine Learning", "Excel"],
          leadership: "Team management, cross-functional collaboration, stakeholder reporting"
        }
      ]
    };
  },
});
