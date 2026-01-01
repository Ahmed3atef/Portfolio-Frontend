import { useState, useEffect } from "react";

/**
 * A custom hook for creating a typing/deleting effect.
 * @param {string[]} words - An array of words to cycle through.
 * @param {number} typeSpeed - Speed of typing in ms.
 * @param {number} deleteSpeed - Speed of deleting in ms.
 * @param {number} pause - Pause duration in ms after a word is typed.
 */
const useTypingEffect = (
    words,
    typeSpeed = 150,
    deleteSpeed = 75,
    pause = 1000
) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];

        const timer = setTimeout(
            () => {
                if (isDeleting) {
                    // Handle deleting
                    setText(currentWord.substring(0, text.length - 1));
                } else {
                    // Handle typing
                    setText(currentWord.substring(0, text.length + 1));
                }

                // Check for state transitions
                if (!isDeleting && text === currentWord) {
                    // Finished typing, pause then start deleting
                    setTimeout(() => setIsDeleting(true), pause);
                } else if (isDeleting && text === "") {
                    // Finished deleting, move to next word
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            },
            isDeleting ? deleteSpeed : typeSpeed
        );

        // Cleanup function to clear the timeout
        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

    return text; // Return the text to be displayed
};

export default useTypingEffect;
