import { tool } from 'ai';
import { z } from 'zod';

export const getAbout = tool({
  description:
    'This tool returns the complete personal story and background of Thao Ho, including his personality, work, and interests',
  parameters: z.object({}),
  execute: async () => {
    return {
      aboutContent: `# Data Engineer based in Finland

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
- **C-level storytelling **: Translating "Delta Lake Spark cluster throughput anomaly" into "here's why we're making more money"

##Origin Story

It all started at Nokia Technologies, where a young analytics trainee first learned that Power BI and a good story could move mountains (or at least KPI dashboards). From there: procurement intelligence at Sievo Oy, then a full consultancy arc at Twoday – ascending from Consultant to Senior Consultant while somehow also finishing a Master's degree at Aalto University. In Finland. Where winter lasts approximately eleven months.

## When Not Debugging Life

When she's not wrestling with distributed systems or teaching neural networks new tricks, Thao channels his inner warrior through:

**🥋 Gym** – Because sometimes you need to throw problems to the ground before you can solve them

**📸 Photography** – Capturing moments with the same precision she applies to capturing data anomalies

**💻 Creative Programming** – Where art meets algorithms, and beautiful code becomes beautiful... code

## The Bottom Line

n a world drowning in raw data, Thao Ho is your calm, certified, extremely well-credentialed navigator – turning 10TB of daily noise into the exact three numbers an executive needs to make a multi-million euro call. Based in Helsinki, fluent in Azure, and apparently immune to Finnish winter.

*Currently accepting new challenges, data puzzles, and recommendations for the best coffee spots in Helsinki.*`
    };
  },
});