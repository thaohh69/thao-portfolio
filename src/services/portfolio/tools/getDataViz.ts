import { tool } from 'ai';
import { z } from 'zod';

export const getDataViz = tool({
  description:
    'This tool showcases data visualization expertise and interactive dashboards created for gaming analytics and executive reporting',
  parameters: z.object({}),
  execute: async () => {
    return {
      visualizations: [
        {
          title: "Executive Gaming Metrics Dashboard",
          type: "Tableau Executive Dashboard",
          audience: "C-Level Leadership",
          description: "Comprehensive dashboard covering monetization, engagement, growth marketing, and technical performance across multiple game titles",
          metrics: [
            "Cumulative ARPU (Average Revenue Per User)",
            "Monthly Cohorted Retention Rates",
            "In-Game Revenue Trends",
            "Player Engagement Metrics",
            "Technical Performance KPIs"
          ],
          impact: "Streamlined bi-weekly executive reporting, reducing preparation time by 60%",
          technologies: ["Tableau", "SQL", "Python", "API Integrations"]
        },
        {
          title: "Player Churn Prediction Analytics",
          type: "ML Model Visualization",
          audience: "Product & Analytics Teams",
          description: "Interactive visualization of machine learning model performance and player risk scoring",
          features: [
            "Real-time churn probability scoring",
            "Feature importance analysis",
            "Model performance metrics visualization",
            "Cohort-based risk segmentation"
          ],
          metrics: {
            "Model Accuracy": "78.4%",
            "Precision": "77%",
            "Daily Predictions": "1M+ players"
          },
          technologies: ["Python", "Scikit-learn", "Plotly", "Streamlit", "SQL"]
        },
        {
          title: "Multi-Platform Gaming Analytics",
          type: "Cross-Platform Dashboard",
          audience: "Product & Engineering Teams",
          description: "Unified analytics dashboard aggregating data from Sony PSN, Microsoft Xbox, and Nintendo platforms",
          dataPoints: [
            "Platform-specific engagement metrics",
            "Cross-platform player behavior patterns",
            "Revenue attribution by platform",
            "Technical performance comparisons"
          ],
          impact: "Enabled data-driven platform optimization decisions",
          technologies: ["Tableau", "API Integrations", "ETL Pipelines", "Airflow"]
        },
        {
          title: "Sentiment Analysis Visualization",
          type: "NLP Analytics Dashboard",
          audience: "Marketing & Community Teams",
          description: "Real-time sentiment tracking of Amazon Games reviews using BERT-based analysis",
          features: [
            "Sentiment trend analysis over time",
            "Topic modeling of review themes",
            "Competitive sentiment comparison",
            "Alert system for sentiment changes"
          ],
          impact: "Enhanced marketing campaign strategies through automated sentiment insights",
          technologies: ["BERT", "Python", "D3.js", "React", "Real-time APIs"]
        },
        {
          title: "Device Performance Analytics",
          type: "Hardware Clustering Visualization",
          audience: "Game Development Teams",
          description: "K-Means clustering visualization of PC hardware impact on player retention and engagement",
          insights: [
            "12 distinct hardware performance clusters",
            "Retention correlation with hardware specs",
            "Optimal hardware targets for game optimization",
            "Performance bottleneck identification"
          ],
          technologies: ["Python", "K-Means", "Interactive Plotting", "Hardware Benchmarking"]
        }
      ],
      expertise: {
        tools: ["PowerBI", "Python (Matplotlib, Plotly, Seaborn)", "D3.js", "Excel", "PowerPoint"],
        specializations: [
          "Executive Dashboards",
          "Real-time Analytics",
          "Machine Learning Visualizations",
          "Gaming Metrics Visualization",
          "Cross-platform Analytics"
        ],
        bestPractices: [
          "User-centric design for different audiences",
          "Performance optimization for large datasets",
          "Interactive and drill-down capabilities",
          "Mobile-responsive dashboard design",
          "Automated reporting and alerting"
        ]
      }
    };
  },
});