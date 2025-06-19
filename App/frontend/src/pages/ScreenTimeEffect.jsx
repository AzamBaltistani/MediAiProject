import React, { useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList, Cell,
} from 'recharts';

import {
    Clock,
    Smartphone,
    Moon,
    Gauge,
    Dice3,
    Calculator,
    Ruler,
} from 'lucide-react';

// Add this at the top of your component
const meanValues = {
    screen_time_hours: 6.00,
    social_media_platforms_used: 3.00,
    hours_on_TikTok: 2.40,
    sleep_hours: 6.98,
};

const medianValues = {
    screen_time_hours: 6.0,
    social_media_platforms_used: 3.0,
    hours_on_TikTok: 2.3,
    sleep_hours: 7.0,
};

const getRandomValues = () => ({
    screen_time_hours: +(Math.random() * 10).toFixed(1),
    social_media_platforms_used: Math.floor(Math.random() * 6),
    hours_on_TikTok: +(Math.random() * 6).toFixed(1),
    sleep_hours: +(4 + Math.random() * 5).toFixed(1), // between 4 to 9
});

export default function ScreenTimeEffect() {
    const [formData, setFormData] = useState({
        screen_time_hours: 0,
        social_media_platforms_used: 0,
        hours_on_TikTok: 0,
        sleep_hours: 0,
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = parseFloat(value);
        if (parsedValue >= 0 || value === '') {
            setFormData({ ...formData, [name]: parsedValue || 0 });
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/screen_vs_health/', formData);
            setResult(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to predict. Make sure the Django backend is running.");
        }
    };

    const chartData = result
        ? [
            { name: 'Stress Level', value: parseFloat(result.stress_level.toFixed(2)) },
            { name: 'Mood Score', value: parseFloat(result.mood_score.toFixed(2)) },
        ]
        : [];

    const getBarColor = (name, value) => {
        if (name === 'Stress Level') {
            return value >= 7 ? 'url(#redGradient)' : value >= 4 ? 'url(#orangeGradient)' : 'url(#greenGradient)';
        } else {
            return value <= 3 ? 'url(#redGradient)' : value <= 6 ? 'url(#orangeGradient)' : 'url(#greenGradient)';
        }
    };

    const inputIcons = {
        screen_time_hours: <Smartphone className="w-5 h-5 text-gray-500" />,
        social_media_platforms_used: <Gauge className="w-5 h-5 text-gray-500" />,
        hours_on_TikTok: <Clock className="w-5 h-5 text-gray-500" />,
        sleep_hours: <Moon className="w-5 h-5 text-gray-500" />,
    };


    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-3.8rem)] text-black dark:text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                    Screen Time Impact on Mental Health
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Form Section */}
                    <div className="lg:w-1/2 space-y-6">
                        {Object.entries(formData).map(([field, value]) => (
                            <div key={field}>
                                <label className="capitalize block mb-2 text-sm sm:text-base font-medium">
                                    {field.replaceAll('_', ' ')}:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        {inputIcons[field]}
                                    </div>
                                    <input
                                        type="number"
                                        step="1"
                                        name={field}
                                        value={value}
                                        onChange={handleChange}
                                        min={0}
                                        className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">


                            <button
                                onClick={() => setFormData(meanValues)}
                                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-full flex items-center gap-2"
                            >
                                <Calculator size={18} /> Mean
                            </button>

                            <button
                                onClick={() => setFormData(medianValues)}
                                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-full flex items-center gap-2"
                            >
                                <Ruler size={18} /> Median
                            </button>

                            <button
                                onClick={() => setFormData(getRandomValues())}
                                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-full flex items-center gap-2"
                            >
                                <Dice3 size={18} /> Random
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 transition duration-200"
                            >
                                Predict
                            </button>
                        </div>
                    </div>

                    {/* Chart Section */}
                    {result && (
                        <div className="lg:w-1/2">
                            <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded">
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart
                                        layout="vertical"
                                        data={chartData}
                                        margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
                                    >
                                        <defs>
                                            <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#ef4444" />
                                                <stop offset="100%" stopColor="#b91c1c" />
                                            </linearGradient>
                                            <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#facc15" />
                                                <stop offset="100%" stopColor="#eab308" />
                                            </linearGradient>
                                            <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#34d399" />
                                                <stop offset="100%" stopColor="#059669" />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" domain={[0, 10]} />
                                        <YAxis type="category" dataKey="name" />
                                        <Tooltip />
                                        <Bar
                                            dataKey="value"
                                            barSize={20}
                                            isAnimationActive={true}
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={getBarColor(entry.name, entry.value)}
                                                />
                                            ))}
                                            <LabelList
                                                dataKey="value"
                                                position="right"
                                                formatter={(val) => val.toFixed(2)}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
