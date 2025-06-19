import { useState } from "react";
import axios from "axios";
import { Stethoscope, Dice3 } from "lucide-react";

export default function DiseasePrediction() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);

    const symptomExamples = [
        "The skin around my mouth, nose, and eyes is red and inflamed. It is often itchy and uncomfortable. There is a noticeable inflammation in my nails.",
        "The swelling in my legs is causing me to have difficulty fitting into my shoes. I can't sprint or stand for long periods of time. I can see some swollen blood vessels.",
        "I have constipation and belly pain, and it's been really uncomfortable. The belly pain has been getting worse and is starting to affect my daily life. Moreover, I get chills every night, followed by a mild fever.",
        "I'm feeling fatigued and have no energy. I can barely keep my eyes open during the day, and I've been feeling lethargic and unable to motivate myself.",
        "The sores on my face are beginning to weep clear fluid. Also, every night I get a high fever and chills, because of which I cannot sleep all night.",
        "I have been experiencing chills and shivering. There is a strong pain in my back and also behind my eyes. I have also noticed small red spots on my back and neck. ",
        "My skin has been itching a lot and developing a rash. Additionally, I have a few areas of my skin that are a different hue than the rest of it. Additionally, I have a few firm pimples or breakouts on my skin.",
        "My eyes are always red and itchy, and my nose feels all stuffy and congested. I just feel kind of sick and tired all the time, and I keep coughing up all this gunk. My throat feels sore and scratchy, and I've noticed that the bumps on my neck are bigger than usual",
        "I've had a terrible cough and cold for days. My face is tired and my sinuses are blocked. In addition, my chest hurts from the phlegm I've been coughing up. I can't smell, and my muscles are in terrible pain.",
        "I'm having a lot of trouble breathing and am really uneasy. I'm feeling unwell and am perspiring a lot. My chest hurts and I have a lot of mucus in my throat. My heart is racing, and the hue of the mucus I'm coughing up is off.",
        "I've been having a lot of trouble with my bowel movements lately. It's hard to go and it hurts when I do. My anus is really sore and it's been bleeding when I go. It's really painful and I'm really uncomfortable.",
        "Recently, when I try to walk about, I have stiffness, a stiff neck, swollen joints, and muscular weakness. Walking has also been really uncomfortable.",
        "When I awoke this morning, I saw a severe rash across my skin. There are many pus-filled pimples and blackheads all over the place. My skin has also been shifting a lot.",
        "I've been experiencing terrible itching and nausea. I've lost weight and am also really exhausted. My skin has become yellow and I have a severe temperature. I have dark urine and stomach ache."
    ];

    const handleRandomSymptom = () => {
        const randomIndex = Math.floor(Math.random() * symptomExamples.length);
        setInput(symptomExamples[randomIndex]);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/predict_disease/", { text: input });
            setResult(res.data.prediction);
        } catch (err) {
            console.error("Prediction error:", err);
            alert("Failed to predict. Make sure the backend is running.");
        }
    };

    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-3.8rem)] text-black dark:text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
                    <Stethoscope className="w-6 h-6 text-blue-500" />
                    Smart Symptom-Based Disease Prediction
                </h1>

                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm sm:text-base font-medium">
                            Describe your symptoms:
                        </label>
                        <textarea
                            className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm sm:text-base p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={5}
                            placeholder="e.g., I feel tired, low on energy, my skin has itchy red patches..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        <button
                            onClick={handleRandomSymptom}
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-full flex items-center gap-2"
                        >
                            <Dice3 size={18} />
                            Random Symptom
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 transition duration-200"
                        >
                            <Stethoscope size={18} />
                            Predict Disease
                        </button>
                    </div>

                    {result && (
                        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-center font-medium">
                            <p>Predicted Disease:</p>
                            <h2 className="text-xl font-bold mt-1">{result}</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
