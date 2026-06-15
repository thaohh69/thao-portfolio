'use client';

import { motion } from 'framer-motion';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { BarChart3, PieChart, TrendingUp, Users, Zap, Target } from 'lucide-react';

const visualizations = [
  {
    title: "Executive Gaming Metrics Dashboard",
    type: "Tableau Executive Dashboard",
    audience: "C-Level Leadership",
    icon: TrendingUp,
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
    icon: Target,
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
    icon: BarChart3,
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
    icon: Users,
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
    icon: Zap,
    description: "K-Means clustering visualization of PC hardware impact on player retention and engagement",
    insights: [
      "12 distinct hardware performance clusters",
      "Retention correlation with hardware specs",
      "Optimal hardware targets for game optimization",
      "Performance bottleneck identification"
    ],
    technologies: ["Python", "K-Means", "Interactive Plotting", "Hardware Benchmarking"]
  }
];

const expertise = {
  tools: ["Tableau", "Python (Matplotlib, Plotly, Seaborn)", "D3.js", "Excel", "PowerPoint"],
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
};

export default function DataViz() {
  return (
    <div className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tighter">Data Visualization Portfolio</h2>
        <p className="text-muted-foreground mt-2">
          Interactive dashboards and analytics visualizations for gaming industry insights
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visualizations.map((viz, index) => {
          const IconComponent = viz.icon || PieChart;
          return (
            <motion.div
              key={viz.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Badge variant="secondary">{viz.type}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Audience: {viz.audience}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{viz.title}</CardTitle>
                  <CardDescription className="text-base">
                    {viz.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {viz.metrics && Array.isArray(viz.metrics) && (
                    <div>
                      <h4 className="font-semibold mb-2">Key Metrics</h4>
                      <ul className="space-y-1">
                        {viz.metrics.map((metric, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {viz.metrics && typeof viz.metrics === 'object' && !Array.isArray(viz.metrics) && (
                    <div>
                      <h4 className="font-semibold mb-2">Performance Metrics</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(viz.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                            <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{value}</div>
                            <div className="text-xs text-muted-foreground">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {viz.features && (
                    <div>
                      <h4 className="font-semibold mb-2">Features</h4>
                      <ul className="space-y-1">
                        {viz.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-green-600 mr-2 mt-1">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {viz.dataPoints && (
                    <div>
                      <h4 className="font-semibold mb-2">Data Points</h4>
                      <ul className="space-y-1">
                        {viz.dataPoints.map((point, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {viz.insights && (
                    <div>
                      <h4 className="font-semibold mb-2">Key Insights</h4>
                      <ul className="space-y-1">
                        {viz.insights.map((insight, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-purple-600 mr-2 mt-1">→</span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {viz.impact && (
                    <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">Business Impact</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">{viz.impact}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {viz.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-lg border"
      >
        <h3 className="text-xl font-semibold mb-4">Data Visualization Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-3">Tools & Technologies</h4>
            <ul className="space-y-1 text-sm">
              {expertise.tools.map((tool) => (
                <li key={tool} className="text-muted-foreground">• {tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-3">Specializations</h4>
            <ul className="space-y-1 text-sm">
              {expertise.specializations.map((spec) => (
                <li key={spec} className="text-muted-foreground">• {spec}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-3">Best Practices</h4>
            <ul className="space-y-1 text-sm">
              {expertise.bestPractices.map((practice) => (
                <li key={practice} className="text-muted-foreground">• {practice}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}