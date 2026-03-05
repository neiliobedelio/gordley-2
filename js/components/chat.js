/*
 * FAQ Chatbot Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Data
    const faqData = {
        greeting: {
            message: "Hi there! 👋 Welcome to Gordley Group. How can we help you today?",
            options: [
                { text: "What services do you offer?", target: "services" },
                { text: "How do I contact you?", target: "contact" },
                { text: "Do you have case studies?", target: "casestudies" },
                { text: "Where are you located?", target: "location" }
            ]
        },
        services: {
            message: "We offer a wide range of services including Public Relations, Marketing, Web Design, Video Production, and Graphic Design. We specialize in creating cohesive brand experiences.",
            options: [
                { text: "Tell me more about Web Design", target: "webdesign" },
                { text: "Tell me more about PR", target: "pr" },
                { text: "Back to menu", target: "greeting" }
            ]
        },
        contact: {
            message: "You can reach us by phone at (520) 327-6077 or email us at info@gordley.com. Alternatively, you can fill out the form on our Contact Page.",
            options: [
                { text: "Go to Contact Page", action: () => window.location.href = 'contact.html' },
                { text: "Back to menu", target: "greeting" }
            ]
        },
        casestudies: {
            message: "Yes! We have a portfolio of our recent work available. We've worked on projects ranging from branding to large-scale public engagement.",
            options: [
                { text: "View Our Work", action: () => window.location.href = 'work.html' },
                { text: "Back to menu", target: "greeting" }
            ]
        },
        location: {
            message: "We are located in beautiful Tucson, Arizona! Our main office is open Monday through Friday, 8:00 AM to 5:00 PM.",
            options: [
                { text: "Back to menu", target: "greeting" }
            ]
        },
        webdesign: {
            message: "Our web design team creates responsive, accessible, and stunning websites tailored to your specific audience.",
            options: [
                { text: "Back to menu", target: "greeting" }
            ]
        },
        pr: {
            message: "Our PR experts handle media relations, crisis communications, and community outreach to keep your brand's reputation strong.",
            options: [
                { text: "Back to menu", target: "greeting" }
            ]
        }
    };

    // Chatbot HTML Structure
    const chatHTML = `
        <div id="faq-chatbot">
            <!-- Toggle Button -->
            <button id="chat-toggle-btn" class="chat-widget-button" aria-label="Open chat">
                <img src="assets/SVG/sparkles.svg" alt="AI Sparkles" class="chat-icon">
                <svg class="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: none;">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
            </button>

            <!-- Chat Window -->
            <div id="chat-window" class="chat-window">
                <div class="chat-header">
                    <div class="chat-header-avatar">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2a10 10 0 0 0-10 10c0 5.25 4.25 9.5 9.5 9.5h5.5l-2.5-2.5c2.5-1.5 4.5-5 4.5-7a10 10 0 0 0-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 1.63-1.39 4.34-3.5 5.5l1 1h-5.5z"/>
                            <circle cx="9" cy="11" r="1.5"/>
                            <circle cx="15" cy="11" r="1.5"/>
                            <path d="M12 16c-1.5 0-2.5-.5-2.5-.5l.5-1s1 .5 2 .5 2-.5 2-.5l.5 1s-1 .5-2 .5z"/>
                        </svg>
                    </div>
                    <div class="chat-header-info">
                        <h3>Gordley Assistant</h3>
                        <p>Typically replies instantly</p>
                    </div>
                </div>

                <div id="chat-messages" class="chat-messages">
                    <!-- Messages go here -->
                </div>

                <div id="chat-options" class="chat-options">
                    <!-- Options go here -->
                </div>

                <div class="chat-input-area">
                    <input type="text" id="chat-text-input" class="chat-input" placeholder="Type your message..." aria-label="Chat input">
                    <button id="chat-send-btn" class="chat-send-btn" aria-label="Send message">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // DOM Elements
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const messagesContainer = document.getElementById('chat-messages');
    const optionsContainer = document.getElementById('chat-options');
    const chatInput = document.getElementById('chat-text-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const chatIcon = toggleBtn.querySelector('.chat-icon');
    const closeIcon = toggleBtn.querySelector('.close-icon');

    // State
    let isOpen = false;
    let isTyping = false;

    // Toggle Chat
    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        if (isOpen) {
            chatWindow.classList.add('is-open');
            toggleBtn.classList.add('is-open');
            chatIcon.style.display = 'none';
            closeIcon.style.display = 'block';

            // Show initial greeting if empty
            if (messagesContainer.children.length === 0) {
                simulateBotResponse('greeting');
            }
        } else {
            chatWindow.classList.remove('is-open');
            toggleBtn.classList.remove('is-open');
            chatIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });

    // Add User Message
    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user';
        msgDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    // Add Bot Message
    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    // Show Options
    function renderOptions(options) {
        optionsContainer.innerHTML = '';

        if (!options || options.length === 0) return;

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = opt.text;

            btn.addEventListener('click', () => {
                if (isTyping) return; // Prevent clicking while typing

                // Clear options
                optionsContainer.innerHTML = '';

                // Show what user asked
                addUserMessage(opt.text);

                // Handle Action or Target
                if (opt.action) {
                    opt.action();
                } else if (opt.target) {
                    simulateBotResponse(opt.target);
                }
            });

            optionsContainer.appendChild(btn);
        });
    }

    // Scroll helper
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Simulate Typing & Response (Generic for text input)
    function simulateBotResponse(targetKey, userText = "") {
        isTyping = true;

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator is-visible';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesContainer.appendChild(typingDiv);
        scrollToBottom();

        // Simulate network delay
        setTimeout(() => {
            // Remove typing indicator
            typingDiv.remove();
            isTyping = false;

            let finalTargetKey = targetKey;

            // Simple "AI" Keyword Matching if it's a raw text input
            if (targetKey === 'text_input' && userText) {
                const lowerText = userText.toLowerCase();

                if (lowerText.includes('what do you do') || lowerText.includes('services') || lowerText.includes('offer')) {
                    finalTargetKey = 'services';
                } else if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('email') || lowerText.includes('reach')) {
                    finalTargetKey = 'contact';
                } else if (lowerText.includes('work') || lowerText.includes('portfolio') || lowerText.includes('case studies') || lowerText.includes('examples')) {
                    finalTargetKey = 'casestudies';
                } else if (lowerText.includes('where') || lowerText.includes('location') || lowerText.includes('located') || lowerText.includes('address')) {
                    finalTargetKey = 'location';
                } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
                    finalTargetKey = 'greeting';
                }
            }

            // Show actual message and new options based on targetKey or generic response
            if (faqData[finalTargetKey]) {
                const data = faqData[finalTargetKey];
                addBotMessage(data.message);
                renderOptions(data.options);
            } else {
                addBotMessage("Thanks for your message! To better assist you, could you please contact us directly at (520) 327-6077 or visit our Contact page? Our team will be happy to help.");
                // Clear options for generic text input responses
                optionsContainer.innerHTML = '';
            }
        }, 800 + Math.random() * 600); // 0.8s to 1.4s delay
    }

    // Handle Text Input Submission
    function handleSend() {
        if (isTyping) return;
        const text = chatInput.value.trim();
        if (text) {
            addUserMessage(text);
            chatInput.value = '';
            simulateBotResponse('text_input', text); // Pass text to the simulate bot response for scanning
        }
    }

    // Send Button Click
    sendBtn.addEventListener('click', handleSend);

    // Enter Key Press
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
