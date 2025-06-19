import { Brain, Stethoscope, Bot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="min-h-[calc(100vh-3.8rem)] bg-white dark:bg-black text-black dark:text-white flex flex-col">
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 px-6 text-center">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4">🧬 Your AI-Powered Health Companion</h1>
                <p className="text-lg sm:text-xl max-w-2xl mx-auto">
                    Explore tools that combine AI and healthcare to enhance your well-being.
                </p>
            </header>

            {/* Features Section */}
            <main className="flex-grow py-16 px-4 sm:px-8 max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
                {/* Feature 1 */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-4 transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex items-center gap-3">
                        <Brain className="w-8 h-8 text-blue-600" />
                        <h2 className="text-xl font-semibold">Screen Time & Sanity</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Discover how your daily screen usage affects your mental health using intelligent analytics.
                    </p>
                    <Link
                        to="/screen-time-effect"
                        className="mt-auto inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                        Explore
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Feature 2 */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-4 transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex items-center gap-3">
                        <Stethoscope className="w-8 h-8 text-green-600" />
                        <h2 className="text-xl font-semibold">Disease Prediction</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Describe your symptoms and get an instant prediction of possible diseases using AI.
                    </p>
                    <Link
                        to="/disease-prediction"
                        className="mt-auto inline-flex items-center gap-1 text-green-600 hover:underline"
                    >
                        Start Diagnosis
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Feature 3 */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-4 transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex items-center gap-3">
                        <Bot className="w-8 h-8 text-purple-600" />
                        <h2 className="text-xl font-semibold">AI Health Assistant</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Chat with your AI-powered medical assistant to get advice and answers in real-time.
                    </p>
                    <Link
                        to="/ai-health-assistant"
                        className="mt-auto inline-flex items-center gap-1 text-purple-600 hover:underline"
                    >
                        Chat Now
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700">
                All Source Code are avaiable on My Github under MIT License
            </footer>
        </div>
    );
}
