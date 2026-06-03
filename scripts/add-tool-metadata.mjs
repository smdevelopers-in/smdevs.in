import fs from 'fs';
import path from 'path';

const toolsDirs = [
  'd:/My Projects/smdevelopers/app/tools/seo',
  'd:/My Projects/smdevelopers/app/tools/trading'
];

for (const dir of toolsDirs) {
  if (!fs.existsSync(dir)) continue;
  
  const folders = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
  
  for (const folder of folders) {
    const pagePath = path.join(dir, folder, 'page.tsx');
    const layoutPath = path.join(dir, folder, 'layout.tsx');
    
    if (fs.existsSync(pagePath)) {
      const content = fs.readFileSync(pagePath, 'utf8');
      
      // Extract title and description from ToolLayout
      let titleMatch = content.match(/title="([^"]+)"/);
      let descMatch = content.match(/description="([^"]+)"/);
      
      // Fallbacks if regex fails
      let title = titleMatch ? titleMatch[1] : `${folder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Tool`;
      let desc = descMatch ? descMatch[1] : `Free online ${title.toLowerCase()} for developers and professionals.`;
      
      // Construct canonical URL
      const category = dir.includes('seo') ? 'seo' : 'trading';
      const canonicalUrl = `https://smdevs.in/tools/${category}/${folder}`;

      const layoutContent = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title.replace(/'/g, "\\'")}',
  description: '${desc.replace(/'/g, "\\'")}',
  alternates: {
    canonical: '${canonicalUrl}'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;
      fs.writeFileSync(layoutPath, layoutContent);
      console.log(`✅ Created layout.tsx for ${folder}`);
    }
  }
}
