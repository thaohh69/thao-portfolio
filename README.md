# Thao Ho - AI Portfolio 🤖✨

**Interactive Data Engineering Portfolio**

Welcome to my AI-powered portfolio! Instead of traditional static pages, this portfolio features an intelligent assistant that can answer questions about my experience, skills, and projects in data engineering and machine learning.

## 🎯 About This Portfolio

This is an interactive portfolio for **Thao Ho**, a Data Engineer with 8+ years of experience in the gaming industry. The portfolio features:

- **AI-powered chat interface** that answers questions about my background
- **Dynamic content rendering** based on user inquiries
- **Responsive design** with modern UI/UX
- **Real-time project showcases** and skill demonstrations

## 🔧 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI Integration**: Anthropic Claude API for intelligent responses
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready with optimized build configuration
- **Styling**: Modern glassmorphism design with dark/light mode support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Anthropic API key (for AI chat functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-portfolio.git
   cd ai-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:
   ```env
   # Required: Claude API for AI chat functionality
   ANTHROPIC_API_KEY=your_anthropic_api_key_here

   # Optional: GitHub API for repository features
   GITHUB_TOKEN=your_github_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Getting API Keys
- **Anthropic API Key**: Get it from [console.anthropic.com](https://console.anthropic.com)
- **GitHub Token** (optional): Generate at [github.com/settings/tokens](https://github.com/settings/personal-access-tokens)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/chat/          # Chat API endpoints and tools
│   ├── chat/              # Chat interface page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── chat/              # Chat-related components
│   ├── ui/                # Reusable UI components
│   └── [feature]/         # Feature-specific components
├── lib/                   # Utilities and configurations
└── hooks/                 # Custom React hooks
```

## 🎨 Features

### Interactive Chat Interface
- Ask questions about my background, experience, and projects
- Intelligent responses powered by Claude AI
- Tool-based architecture for dynamic content rendering

### Dynamic Content Tools
- **Experience Tool**: Gaming industry career journey
- **Projects Tool**: Data engineering and ML project showcases
- **Skills Tool**: Technical expertise and proficiency levels
- **Contact Tool**: Professional contact information and social links

### Modern UI/UX
- Responsive design for all device sizes
- Smooth animations and transitions
- Glassmorphism design aesthetic
- Dark/light mode support

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add environment variables** in Vercel dashboard
4. **Deploy automatically** on every push

## 📝 Customization

To adapt this portfolio for your own use:

1. **Update personal information** in `src/app/api/chat/tools/`
2. **Replace avatar images** in `public/` directory
3. **Modify contact details** in `src/components/contact.tsx`
4. **Update project data** in respective component files
5. **Customize styling** in Tailwind classes and global CSS

## 🤝 Contributing

While this is a personal portfolio, feel free to:
- Report bugs or issues
- Suggest improvements
- Use as inspiration for your own AI portfolio

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: thaohohoang.work@gmail.com
- **LinkedIn**: [thaohh69](https://linkedin.com/in/thaohh69)
- **GitHub**: [Your GitHub Profile]
- **Medium**: [@thaoho](https://medium.com/@thaoho)

---

### 🏷️ Tags

`#DataEngineering` `#AIPortfolio` `#MachineLearning` `#NextJS` `#React` `#TypeScript` `#AWS` `#Python` `#GamingIndustry` `#InteractiveResume`