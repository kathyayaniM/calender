import type { LucideProps } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { FC } from 'react';

// Define a type for the icon names available in lucide-react
// This is not exhaustive and ideally would be generated or use a more robust solution
// For now, list the ones used in CATEGORY_STYLES
type IconName = 'Briefcase' | 'Users' | 'AlertTriangle' | 'User' | 'Gift' | 'CalendarDays';

interface IconProps extends LucideProps {
  name: IconName;
}

const Icon: FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = dynamic(() =>
    import('lucide-react').then((mod) => {
      // Check if the icon name exists in the module
      if (name in mod) {
        return mod[name as keyof typeof mod] as FC<LucideProps>;
      }
      // Fallback icon if the specified name is not found
      return mod['HelpCircle'] as FC<LucideProps>; 
    })
  );

  return <LucideIcon {...props} />;
};

export default Icon;
