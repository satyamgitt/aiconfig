import React from 'react';
import * as LucideIcons from 'lucide-react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const Icons = {
  // Navigation and Actions
  Power: (props: IconProps) => <LucideIcons.Power {...props} />,
  ChevronRight: (props: IconProps) => <LucideIcons.ChevronRight {...props} />,
  ChevronLeft: (props: IconProps) => <LucideIcons.ChevronLeft {...props} />,
  X: (props: IconProps) => <LucideIcons.X {...props} />,
  Plus: (props: IconProps) => <LucideIcons.Plus {...props} />,
  Play: (props: IconProps) => <LucideIcons.Play {...props} />,
  
  // Form and Input
  Mail: (props: IconProps) => <LucideIcons.Mail {...props} />,
  Lock: (props: IconProps) => <LucideIcons.Lock {...props} />,
  User: (props: IconProps) => <LucideIcons.User {...props} />,
  
  // Features and Benefits
  Zap: (props: IconProps) => <LucideIcons.Zap {...props} />,
  Shield: (props: IconProps) => <LucideIcons.Shield {...props} />,
  Heart: (props: IconProps) => <LucideIcons.Heart {...props} />,
  Sparkles: (props: IconProps) => <LucideIcons.Sparkles {...props} />,
  Sun: (props: IconProps) => <LucideIcons.Sun {...props} />,
  Leaf: (props: IconProps) => <LucideIcons.Leaf {...props} />,
  Quote: (props: IconProps) => <LucideIcons.Quote {...props} />,
  
  // Smart Home
  Lightbulb: (props: IconProps) => <LucideIcons.Lightbulb {...props} />,
  Fan: (props: IconProps) => <LucideIcons.Fan {...props} />,
  Tv: (props: IconProps) => <LucideIcons.Tv {...props} />,
  Smartphone: (props: IconProps) => <LucideIcons.Smartphone {...props} />
};