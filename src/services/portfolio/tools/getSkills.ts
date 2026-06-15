import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
  description:
    'This tool showcases the comprehensive technical skills of a Senior Data Engineer with gaming industry expertise',
  parameters: z.object({}),
  execute: async () => {
    return {
      dataEngineering: {
        title: "Data Engineering Stack",
        skills: [
          { name: "SQL", level: "Expert", years: "6 years", description: "Complex queries, optimization, data warehousing" },
          { name: "Python", level: "Expert", years: "6 years", description: "Data processing automation, API development" },
          { name: "Airflow", level: "Intermediate", years: "2 years", description: "Workflow orchestration, pipeline automation" },
          { name: "ETL/ELT Pipelines", level: "Expert", years: "5 years", description: "Data transformation, API integrations" },
          { name: "TypeScript", level: "Intermediate", years: "2 years", description: "Full-stack development, API design" }
        ]
      },
      aiMachineLearning: {
        title: "AI & Machine Learning",
        skills: [
          { name: "Logistic Regression", level: "Advanced", achievement: "78.4% churn prediction accuracy" },
          { name: "K-Means Clustering", level: "Advanced", achievement: "Device performance clustering analysis" },
          { name: "BERT/Transformers", level: "Intermediate", achievement: "Sentiment analysis for game reviews" },
          { name: "ChatGPT/Claude", level: "Advanced", achievement: "AI automation for data lineage" },
          { name: "Prompt Engineering", level: "Expert", achievement: "LLM workflow optimization" },
          { name: "AI Agents", level: "Intermediate", achievement: "Automated data operations" }
        ]
      },
      dataVisualization: {
        title: "Data Visualization & Analytics",
        skills: [
          { name: "Power BI", level: "Expert", years: "6 years", description: "Executive dashboards, complex visualizations" },
          { name: "Excel", level: "Expert", years: "8 years", description: "Advanced analytics, pivot tables, VBA" },
          { name: "PowerPoint", level: "Expert", years: "8 years", description: "Executive presentations, data storytelling" },
          { name: "Python Visualization", level: "Advanced", tools: "Matplotlib, Plotly, Seaborn" },
          { name: "Interactive Dashboards", level: "Advanced", description: "Real-time analytics, drill-down capabilities" }
        ]
      },
      gamingPlatforms: {
        title: "Gaming Industry Expertise",
        skills: [
          { name: "Sony PSN API", level: "Advanced", description: "Data extraction, player analytics" },
          { name: "Microsoft Xbox API", level: "Advanced", description: "Console gaming metrics" },
          { name: "Nintendo API", level: "Advanced", description: "Multi-platform integration" },
          { name: "Mobile Gaming Analytics", level: "Expert", achievement: "Call of Duty Mobile leadership" },
          { name: "Gaming Metrics", level: "Expert", metrics: "ARPU, retention, engagement, churn" }
        ]
      },
      collaboration: {
        title: "Collaboration & Project Management",
        skills: [
          { name: "JIRA", level: "Advanced", years: "5 years", description: "Agile project management" },
          { name: "Confluence", level: "Advanced", years: "5 years", description: "Documentation, knowledge sharing" },
          { name: "Git", level: "Advanced", years: "6 years", description: "Version control, collaborative development" },
          { name: "Cross-functional Leadership", level: "Intermediate", achievement: "Led teams across analytics, product, engineering" }
        ]
      },
      softSkills: {
        title: "Professional Skills",
        skills: [
          "Data-Driven Decision Making",
          "Executive Communication",
          "Technical Leadership",
          "A/B Testing & Experimentation",
          "Stakeholder Management",
          "Problem-Solving",
          "Gaming Industry Domain Knowledge",
          "Team Management (up to 3 analysts)"
        ]
      }
    };
  },
});
