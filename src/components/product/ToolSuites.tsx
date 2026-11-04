'use client';

import { Globe, Mail, FileText, Sparkles, Cpu, Plug, type LucideIcon } from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/motion/primitives';
import s from './ToolSuites.module.css';

type Suite = { icon: LucideIcon; name: string; blurb: string; tools: string[] };

const SUITES: Suite[] = [
  { icon: Globe, name: 'Web Intelligence', blurb: 'See and act across the open web.', tools: ['Web Search', 'Web Scraper', 'Headless Browser'] },
  { icon: Mail, name: 'Email Operations', blurb: 'Read, understand, draft, and send.', tools: ['Ingest · IMAP', 'Classify', 'Draft · KB-powered', 'Send · SMTP'] },
  { icon: FileText, name: 'Document & Data Factory', blurb: 'Generate real business documents.', tools: ['Excel', 'PDF', 'Word', 'PowerPoint', 'File Writer'] },
  { icon: Sparkles, name: 'Creative Studio', blurb: 'Multi-provider, router-brokered generation.', tools: ['Image · Nano Banana', 'Image · ChatGPT', 'Image · Kling', 'Video · Veo', 'Video · SeeDance', 'Voice · OmniBuddha', 'Voice · Gemini Live', 'Voice · ChatGPT Realtime'] },
  { icon: Cpu, name: 'Precision & Dev', blurb: 'Exact math and sandboxed execution.', tools: ['Calculator', 'Sandbox Code Executor', 'Terminal'] },
  { icon: Plug, name: 'Connections', blurb: 'Work inside the accounts you already run.', tools: ['Gmail', 'Outlook', 'Google Drive', 'WhatsApp', 'Facebook Pages', 'Instagram', 'LinkedIn Pages', 'X', 'YouTube', 'Google Ads', 'HubSpot', 'GitHub', 'MCP servers', 'Scheduler'] },
];

export function ToolSuites() {
  return (
    <Stagger className={s.grid} stagger={0.08}>
      {SUITES.map((suite) => (
        <StaggerItem key={suite.name} className={s.suite} data-spot>
          <div className={s.head}>
            <span className={s.icon}><suite.icon size={22} strokeWidth={1.6} /></span>
            <div>
              <div className={s.name}>{suite.name}</div>
              <div className={s.blurb}>{suite.blurb}</div>
            </div>
          </div>
          <div className={s.tools}>
            {suite.tools.map((t) => <span key={t} className={s.tool}>{t}</span>)}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
