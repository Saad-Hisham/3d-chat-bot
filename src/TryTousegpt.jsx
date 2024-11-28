
import { OpenAI } from "openai";
const Chatbot = () => {
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const fetchChatResponse = async () => {
        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo', // You can change the model as needed
                messages: [{ role: 'user', content: 'Hello, world!' }],
            });

            console.log(completion);
        } catch (error) {
            console.error("Error fetching response from OpenAI:", error);
        }
    };

    return (
        <div>
            <button onClick={fetchChatResponse}>Start Chat</button>
            <p>hello</p>
        </div>
    );
};

export default Chatbot;
