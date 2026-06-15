// src/components/features/chat/tool-renderer.tsx
import { Contact } from '../portfolio/contact';
import AllProjects from '../portfolio/projects/AllProjects';
import Skills from '../portfolio/skills';
import GamingExperience from '../portfolio/gaming-experience';
import DataViz from '../portfolio/data-viz';
import AboutStory from '../portfolio/about-story';

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  result?: any; // Using any for flexibility with tool results
}

interface ToolRendererProps {
  toolInvocations: ToolInvocation[];
  messageId: string;
}

export default function ToolRenderer({
  toolInvocations,
}: ToolRendererProps) {
  return (
    <div className="w-full transition-all duration-300">
      {toolInvocations.map((tool) => {
        const { toolCallId, toolName } = tool;

        // Return specialized components based on tool name
        switch (toolName) {
          case 'getProjects':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg"
              >
                <AllProjects />
              </div>
            );


          case 'getResume':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <GamingExperience data={tool.result} />
              </div>
            );

          case 'getContact':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Contact />
              </div>
            );

          case 'getSkills':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Skills />
              </div>
            );





          case 'getGamingExperience':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <GamingExperience data={tool.result} />
              </div>
            );

          case 'getExperience':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <GamingExperience data={tool.result} />
              </div>
            );

          case 'getDataViz':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <DataViz />
              </div>
            );

          case 'getAbout':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <AboutStory data={tool.result} />
              </div>
            );

          // Default renderer for other tools
          default:
            return (
              <div
                key={toolCallId}
                className="bg-secondary/10 w-full rounded-lg p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-medium">{toolName}</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
                    Tool Result
                  </span>
                </div>
                <div className="mt-2">
                  {typeof tool.result === 'object' ? (
                    <pre className="bg-secondary/20 overflow-x-auto rounded p-3 text-sm">
                      {JSON.stringify(tool.result, null, 2)}
                    </pre>
                  ) : (
                    <p>{String(tool.result)}</p>
                  )}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
