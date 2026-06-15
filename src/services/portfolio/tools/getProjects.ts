
import { tool } from "ai";
import { z } from "zod";

export const getProjects = tool({
  description:
    "This tool showcases major data engineering and analytics projects from Amazon Games and Activision Blizzard",
  parameters: z.object({}),
  execute: async () => {
    return {
      featuredProjects: [
        {
          title: "Multi-Platform Gaming Data Infrastructure",
          company: "Amazon Games",
          period: "2022-Present",
          type: "Data Infrastructure",
          description: "Built comprehensive data infrastructure supporting multiple AAA game titles with real-time analytics capabilities",
          keyFeatures: [
            "Data pipelines from Sony PSN, Microsoft Xbox, and Nintendo APIs",
            "Streamlined data warehouse architecture for multi-game support",
            "Real-time player behavior analytics and reporting",
            "Scalable ETL/ELT processes handling millions of events daily"
          ],
          technologies: ["Python", "SQL", "Airflow", "AWS", "API Integrations"],
          impact: "Enabled data-driven decision making across multiple game titles",
          metrics: "Processing 10M+ daily events across platforms"
        },
        {
          title: "Player Churn Prediction ML Pipeline",
          company: "Amazon Games", 
          period: "2023-2024",
          type: "Machine Learning",
          description: "End-to-end machine learning pipeline for predicting player churn with high accuracy",
          keyFeatures: [
            "Logistic regression model with 78.4% accuracy",
            "Real-time scoring of 1M+ players daily",
            "Feature engineering from behavioral data",
            "Automated model retraining and deployment"
          ],
          technologies: ["Python", "Scikit-learn", "SQL", "Airflow", "AWS"],
          impact: "Early identification of at-risk players for targeted retention",
          metrics: "78.4% accuracy, 77% precision"
        },
        {
          title: "Call of Duty Mobile Analytics Platform",
          company: "Activision Blizzard",
          period: "2020-2022", 
          type: "Analytics Leadership",
          description: "Led analytics for one of the world's largest mobile games with comprehensive A/B testing and optimization",
          keyFeatures: [
            "Executive reporting dashboard for C-level leadership",
            "A/B testing framework for feature optimization",
            "Player behavior analysis and segmentation",
            "Revenue optimization through data insights"
          ],
          technologies: ["Tableau", "SQL", "Python", "Statistical Analysis"],
          impact: "30% revenue increase, 75% cost reduction through optimization",
          metrics: "100M+ MAU, $1B+ annual revenue"
        },
        {
          title: "Gaming Sentiment Analysis System",
          company: "Amazon Games",
          period: "2023",
          type: "AI/NLP",
          description: "BERT-based sentiment analysis system for Amazon Games review monitoring and marketing optimization",
          keyFeatures: [
            "Real-time sentiment tracking of game reviews",
            "Automated topic modeling and trend analysis", 
            "Marketing campaign impact measurement",
            "Competitive sentiment comparison dashboard"
          ],
          technologies: ["BERT", "Python", "Transformers", "PyTorch", "AWS"],
          impact: "Enhanced marketing strategies through automated sentiment insights",
          metrics: "85%+ accuracy, real-time processing"
        },
        {
          title: "Device Performance Clustering Analysis", 
          company: "Amazon Games",
          period: "2022-2023",
          type: "Data Science",
          description: "K-Means clustering analysis to understand PC hardware impact on player engagement and retention",
          keyFeatures: [
            "Web scraping of hardware benchmark data",
            "Fuzzy matching with player hardware specifications", 
            "12 distinct hardware performance clusters identified",
            "Retention correlation analysis with hardware specs"
          ],
          technologies: ["Python", "K-Means", "Web Scraping", "Data Visualization"],
          impact: "Identified optimal hardware targets for game optimization",
          metrics: "12 clusters, hardware-retention correlation insights"
        }
      ],
      projectCategories: {
        "Data Infrastructure": "Large-scale data pipelines, warehouse architecture, multi-platform integration",
        "Machine Learning": "Predictive modeling, churn analysis, automated ML pipelines", 
        "Analytics Leadership": "Executive reporting, A/B testing, revenue optimization",
        "AI/NLP": "Sentiment analysis, natural language processing, BERT implementations",
        "Data Science": "Clustering analysis, statistical modeling, performance optimization"
      }
    };
  },
});