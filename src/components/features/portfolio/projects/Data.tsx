import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';

// Game projects content array - showcasing games worked on at Amazon Games and Activision Blizzard
const PROJECT_CONTENT = [
  {
    title: 'King of Meat',
    description:
      'A chaotic 1-4 player party platformer where players battle through official and community-built dungeons. As a Senior Data Engineer at Amazon Games, I built data infrastructure supporting player analytics, engagement tracking, and community content metrics for this upcoming cooperative adventure.',
    techStack: [
      'Python',
      'SQL',
      'AWS',
      'Airflow',
      'Real-time Analytics',
      'Player Behavior Analysis'
    ],
    date: '2024-Present',
    links: [
      {
        name: 'Official Website',
        url: 'https://www.kingofmeat.com/en-gb',
      },
      {
        name: 'Steam Page',
        url: 'https://store.steampowered.com/app/1926980/King_of_Meat/',
      },
      {
        name: 'PlayStation Store',
        url: 'https://store.playstation.com/en-us/concept/10005107/',
      },
      {
        name: 'Xbox Store',
        url: 'https://www.xbox.com/en-US/games/store/king-of-meat/9ppb3zrfg3r1',
      }
    ],
    dataEngineeringWork: [
      'Designed and implemented real-time data ingestion pipelines from multiple gaming platforms',
      'Streamlined ETL processes to reduce data processing latency by 40%',
      'Standardized data tables and schemas for consistent analytics across teams',
      'Built executive-level dashboards for leadership team showing key player metrics',
      'Implemented automated data quality checks and monitoring systems',
      'Created scalable data warehouse architecture supporting millions of daily events'
    ],
  },
  {
    title: 'Throne and Liberty',
    description:
      'A dynamic MMORPG featuring large-scale PvP battles, environmental transformation, and guild warfare. At Amazon Games, I developed data pipelines for player behavior analysis, PvP metrics tracking, and server performance monitoring to optimize the gameplay experience across multiple regions.',
    techStack: [
      'Python',
      'SQL',
      'AWS',
      'Real-time Processing',
      'PvP Analytics',
      'Server Monitoring'
    ],
    date: '2023-Present',
    links: [
      {
        name: 'Official Website',
        url: 'https://www.playthroneandliberty.com/en-us/',
      },
      {
        name: 'Steam Page',
        url: 'https://store.steampowered.com/app/1628520/Throne_and_Liberty/',
      },
      {
        name: 'PlayStation Store',
        url: 'https://store.playstation.com/en-us/concept/10008034/',
      },
      {
        name: 'Xbox Store',
        url: 'https://www.xbox.com/en-US/games/store/throne-and-liberty/9MWWJQLQ590G',
      }
    ],
    dataEngineeringWork: [
      'Built comprehensive data ingestion framework for multi-region player data',
      'Developed ETL pipelines processing 50M+ daily player interactions',
      'Standardized dimensional modeling for PvP analytics and guild performance metrics',
      'Created executive dashboards tracking regional performance and player engagement',
      'Implemented real-time monitoring for server performance and player experience',
      'Designed data marts optimized for analyst self-service and ad-hoc queries'
    ],
  },
  {
    title: 'Lost Ark',
    description:
      'A free-to-play MMO action RPG featuring challenging Guardian Raids, dungeons, and endgame progression. At Amazon Games, I built comprehensive analytics infrastructure tracking player progression, retention metrics, and in-game economy health across multiple servers and regions.',
    techStack: [
      'Python',
      'SQL',
      'Tableau',
      'AWS',
      'Player Analytics',
      'Economy Monitoring'
    ],
    date: '2022-Present',
    links: [
      {
        name: 'Official Website',
        url: 'https://www.playlostark.com/en-gb',
      },
      {
        name: 'Steam Page',
        url: 'https://store.steampowered.com/app/1599340/Lost_Ark/',
      }
    ],
    dataEngineeringWork: [
      'Architected data ingestion systems for complex MMO player progression tracking',
      'Streamlined ETL workflows to handle high-volume raid and dungeon event data',
      'Standardized fact and dimension tables for progression analytics and economy monitoring',
      'Built executive reporting infrastructure for player retention and revenue metrics',
      'Implemented automated data lineage documentation and impact analysis',
      'Created optimized data models enabling sub-second query performance for analysts'
    ],
  },
  {
    title: 'New World',
    description:
      'An action RPG set on the supernatural island of Aeternum with open-world exploration, crafting, and PvP content. At Amazon Games, I designed data collection systems for player engagement metrics, crafting system analytics, and territorial control statistics to optimize gameplay balance.',
    techStack: [
      'Python',
      'SQL',
      'AWS',
      'Engagement Analytics',
      'Crafting Metrics',
      'PvP Analysis'
    ],
    date: '2021-Present',
    links: [
      {
        name: 'Official Website',
        url: 'https://www.newworld.com/en-us/',
      },
      {
        name: 'Steam Page',
        url: 'https://store.steampowered.com/app/1063730/New_World/',
      },
      {
        name: 'PlayStation Store',
        url: 'https://store.playstation.com/en-us/product/UP5267-PPSA07398_00-NWDELUXEBUNDLE00',
      },
      {
        name: 'Xbox Store',
        url: 'https://www.xbox.com/en-US/games/store/new-world-aeternum-deluxe-edition/9P9QG255Z8WC/0010',
      }
    ],
    dataEngineeringWork: [
      'Designed data ingestion architecture for open-world player behavior tracking',
      'Built ETL pipelines aggregating crafting system and territorial control data',
      'Standardized analytics tables for cross-functional team access and reporting',
      'Developed executive dashboards showing player engagement and PvP activity trends',
      'Implemented data validation frameworks ensuring accuracy across multiple data sources',
      'Created automated reporting systems for game balance and progression analysis'
    ],
  },
  {
    title: 'Call of Duty Mobile',
    description:
      'One of the world\'s largest mobile games with over 100M monthly active users. As Senior Analyst at Activision Blizzard, I led analytics initiatives that achieved 75% production cost reduction and 30% revenue increase through A/B testing, player behavior analysis, and performance optimization.',
    techStack: [
      'Python',
      'SQL',
      'Tableau',
      'A/B Testing',
      'Player Analytics',
      'Performance Analysis'
    ],
    date: '2020-2022',
    links: [
      {
        name: 'Official Website',
        url: 'https://www.callofduty.com/mobile',
      },
      {
        name: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.activision.callofduty.shooter',
      },
      {
        name: 'App Store',
        url: 'https://apps.apple.com/us/app/call-of-duty-mobile/id1287282214',
      }
    ],
    analyticsWork: [
      'Built comprehensive executive dashboards for C-level leadership tracking 100M+ MAU',
      'Led A/B testing framework design and statistical analysis for feature optimization',
      'Conducted advanced clustering analysis to identify high-value player segments',
      'Performed ad-hoc analysis driving 30% revenue increase through targeted insights',
      'Created automated reporting systems for daily/weekly business performance reviews',
      'Developed predictive models for player lifecycle and retention optimization'
    ],
  },
  {
    title: 'Call of Duty Online',
    description:
      'A free-to-play online first-person shooter developed specifically for the Chinese market. During my consulting work with Activision Blizzard, I contributed to player behavior analysis and game performance optimization that helped establish sustainable engagement patterns in the competitive Chinese gaming market.',
    techStack: [
      'Python',
      'SQL',
      'Player Analytics',
      'Performance Optimization',
      'Market Analysis',
      'Retention Modeling'
    ],
    date: '2017-2020',
    links: [
      {
        name: 'IGN Game Info',
        url: 'https://www.ign.com/games/call-of-duty-online',
      }
    ],
    analyticsWork: [
      'Designed executive reporting dashboards for Chinese market performance tracking',
      'Conducted market-specific player behavior analysis and competitive benchmarking',
      'Built A/B testing infrastructure for feature rollouts and engagement optimization',
      'Performed clustering analysis to understand regional player preferences and patterns',
      'Created ad-hoc analysis frameworks for rapid business question resolution',
      'Developed retention models optimized for competitive Chinese gaming market dynamics'
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  dataEngineeringWork?: string[];
  analyticsWork?: string[];
  keyFeatures?: string[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data from both professional and personal projects
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title) ||
                      PERSONAL_PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
                <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            ))}
          </div>
        </div>
      )}

      {/* Key Features */}
      {'keyFeatures' in projectData && projectData.keyFeatures && projectData.keyFeatures.length > 0 && (
        <div className="space-y-6">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Key Features
            </h3>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.keyFeatures.map((feature: string, index: number) => (
              <div
                key={index}
                className="bg-[#F5F5F7] flex items-start gap-3 rounded-xl p-4 dark:bg-neutral-800"
              >
                <span className="text-purple-600 mt-1 text-sm">•</span>
                <span className="font-light text-sm leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Engineering Work */}
      {'dataEngineeringWork' in projectData && projectData.dataEngineeringWork && projectData.dataEngineeringWork.length > 0 && (
        <div className="space-y-6">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Data Engineering Contributions
            </h3>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.dataEngineeringWork.map((work: string, index: number) => (
              <div
                key={index}
                className="bg-[#F5F5F7] flex items-start gap-3 rounded-xl p-4 dark:bg-neutral-800"
              >
                <span className="text-blue-600 mt-1 text-sm">•</span>
                <span className="font-light text-sm leading-relaxed">{work}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Work */}
      {'analyticsWork' in projectData && projectData.analyticsWork && projectData.analyticsWork.length > 0 && (
        <div className="space-y-6">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Analytics & Leadership Contributions
            </h3>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.analyticsWork.map((work: string, index: number) => (
              <div
                key={index}
                className="bg-[#F5F5F7] flex items-start gap-3 rounded-xl p-4 dark:bg-neutral-800"
              >
                <span className="text-green-600 mt-1 text-sm">•</span>
                <span className="font-light text-sm leading-relaxed">{work}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Personal projects content array - showcasing side projects and passion work
const PERSONAL_PROJECT_CONTENT = [
  {
    title: 'Binance Real-Time Data Lakehouse',
    description:
      'A production-style local Data Engineering project that ingests live cryptocurrency trade data from Binance WebSocket API, streams it through Kafka, processes it with Apache Spark using a Medallion Architecture, stores data in MinIO and PostgreSQL, builds analytical marts with dbt, orchestrates the workflow with Apache Airflow, and visualizes business-ready insights in Metabase.',
    techStack: [
      'Apache Kafka',
      'Kafka Connect',
      'Airflow',
      'PostgreSQL',
      'Grafana',
      'Docker',
      'Python'
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/thaohh69/Binance_API_DataLakeHouse',
      },
      {
        name: 'Architecture Diagram',
        url: 'https://github.com/thaohh69/Binance_API_DataLakeHouse/blob/main/architecture.png',
      },
    ],
    keyFeatures: [
      'Real-time event streaming with Apache Kafka for high-throughput data ingestion on distributed messaging backbone',
      'Stream processing using ksqlDB with Avro schemas for type-safe transformations and real-time SQL on streams',
      'Automated end-to-end data pipeline from event generation to visualization with zero manual intervention',
      'Three comprehensive Grafana dashboards: Session Overview, Real-Time Activity, and Product Analytics',
      'Schema management with Confluent Schema Registry ensuring data consistency and backward compatibility',
      'JDBC Sink connector for seamless PostgreSQL integration with automatic data synchronization',
      'Docker-based deployment with Docker Compose for easy setup and horizontal scalability',
      'Event schemas include event_id, event_type, session_id, user_id, user_segment, product details, and cart information',
      'Stateful stream processing with RocksDB for handling complex aggregations and windowing operations',
      'Optimized storage with PostgreSQL indexing for fast analytical queries and Grafana query result caching'
    ],
    analyticsWork: [
      'Session Overview Dashboard: Tracks user behavior patterns, conversion rates, and customer segments',
      'Real-Time Activity Dashboard: Displays live event metrics and system health',
      'Product Analytics Dashboard: Shows revenue trends, average order value, and cart abandonment rates',
      'Custom metrics for monitoring data pipeline performance and data quality',
    ],
  },
];

// Main data export with game projects
export const data = [
  {
    category: 'Amazon Games',
    title: 'King of Meat',
    src: '/games/king-of-meat-cover.jpg',
    content: <ProjectContent project={{ title: 'King of Meat' }} />,
  },
  {
    category: 'Amazon Games',
    title: 'Throne and Liberty',
    src: '/games/throne-of-liberty-cover.jpg',
    content: <ProjectContent project={{ title: 'Throne and Liberty' }} />,
  },
  {
    category: 'Amazon Games',
    title: 'Lost Ark',
    src: '/games/lost-ark-cover.jpg',
    content: <ProjectContent project={{ title: 'Lost Ark' }} />,
  },
  {
    category: 'Amazon Games',
    title: 'New World',
    src: '/games/new-world-cover.jpg',
    content: <ProjectContent project={{ title: 'New World' }} />,
  },
  {
    category: 'Activision Blizzard',
    title: 'Call of Duty Mobile',
    src: '/games/call-of-duty-mobile-cover.jpg',
    content: <ProjectContent project={{ title: 'Call of Duty Mobile' }} />,
  },
  {
    category: 'Activision Blizzard',
    title: 'Call of Duty Online',
    src: '/games/COD_online_cover.webp',
    content: <ProjectContent project={{ title: 'Call of Duty Online' }} />,
  },
];

// Personal projects data export
export const personalProjectsData = [
  {
    category: 'Personal Project',
    title: 'Binance Real-Time Data Lakehouse',
    src: '/projects/realtime-ecommerce-analytics.jpg',
    content: <ProjectContent project={{ title: 'Binance Real-Time Data Lakehouse' }} />,
  },
];
