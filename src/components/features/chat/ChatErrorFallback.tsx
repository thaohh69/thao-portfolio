'use client';

import { AlertCircle, Mail, MessageCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ChatErrorFallbackProps {
  error?: string;
  onRetry?: () => void;
}

export function ChatErrorFallback({ error, onRetry }: ChatErrorFallbackProps) {
  const isCreditsIssue = error?.toLowerCase().includes('credit') || 
                        error?.toLowerCase().includes('quota') ||
                        error?.toLowerCase().includes('api limit');
  
  const isConfigIssue = error?.toLowerCase().includes('authentication') ||
                       error?.toLowerCase().includes('not properly configured');

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-xl">
            {isCreditsIssue ? 'Chat Temporarily Unavailable' : 
             isConfigIssue ? 'Service Configuration Issue' : 
             'Connection Problem'}
          </CardTitle>
          <CardDescription className="text-sm">
            {error || 'Unable to connect to the chat service right now.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Retry button for temporary issues */}
          {!isCreditsIssue && !isConfigIssue && onRetry && (
            <Button 
              onClick={onRetry}
              className="w-full"
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          
          {/* Contact alternatives */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              In the meantime, you can:
            </p>
            
            <div className="grid gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // Navigate to home page with contact section
                    window.location.href = '/#contact';
                  }
                }}
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Use Contact Form
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://www.linkedin.com/in/sai-chigili/', '_blank')}
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                LinkedIn Message
              </Button>
            </div>
          </div>
          
          {/* Additional info for credits issue */}
          {isCreditsIssue && (
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                🚀 Claude is experiencing high demand (success!)
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                While my AI twin takes a power nap, the original human version is still online and ready to chat!
              </p>
            </div>
          )}
          
          {/* Additional info for config issues */}
          {isConfigIssue && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                🔧 There's a configuration issue that I need to fix. 
                Please contact me directly and I'll respond personally!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}