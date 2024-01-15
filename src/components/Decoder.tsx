
import { useState } from "react";
class VignereDecode {

    private static readonly ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    static decode(encodedText: string, key: string): string {
        let decodedText = '';
        const keyLength = key.length;

        for (let i = 0; i < encodedText.length; i++) {
            const encodedChar = encodedText[i].toUpperCase();
            const keyChar = key[i % keyLength].toUpperCase();

            if (this.ALPHABET.includes(encodedChar)) {
                const encodedIndex = this.ALPHABET.indexOf(encodedChar);
                const keyIndex = this.ALPHABET.indexOf(keyChar);

                const plainIndex = (encodedIndex - keyIndex + this.ALPHABET.length) % this.ALPHABET.length;
                decodedText += this.ALPHABET[plainIndex];
            } else {
                // Preserve non-alphabetic characters
                decodedText += encodedChar;
            }
        }

        return decodedText.toLowerCase();
    }
}


const Decoder = () => {
    const [plainText, setPlainText] = useState('');
    const [key, setKey] = useState('');
    const [decryptedText, setdecryptedText] = useState('');
    const [showWarning, setShowWarning] = useState<boolean>(false);

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        // Check if the input contains only A-Z and a-z
        const isValidInput = /^[a-zA-Z]*$/.test(input);

        // Update the state with the input
        setKey(input);

        // Show or hide the warning based on input validity
        setShowWarning(!isValidInput);
    };

    const handleEncrypt = () => {
        // Use the Cipher class to encrypt the plain text
        const result = VignereDecode.decode(plainText, key);
        setdecryptedText(result);
    };
    const handleClear = () => {
        // Clear the input fields by resetting their corresponding state values
        setPlainText('');
        setKey('');
        setdecryptedText('');
    };

    return (
        <div className="border rounded-lg shadow-lg p-6 my-3 bg-gray-800 text-white">
            <h1 className="text-2xl mb-4">Vigenere Decoder</h1>
            <div className="mb-4">
                <label className="block text-sm">Encoded Text:</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm">Cipher Key:</label>
                <input
                    type="text"
                    className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${showWarning ? 'border-red-500' : ''
                        }`}
                    value={key}
                    onChange={handleKeyChange}
                />
                {showWarning && (
                    <p className="text-red-500 text-sm mt-1">Please enter only A-Z and a-z characters.</p>
                )}
            </div>
            <div className="mb-4 flex justify-between">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={handleEncrypt}
                >
                    Decrypt
                </button>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
            <div>
                <label className="block text-sm">Decrypted Text:</label>
                <div className="text-lg font-semibold">{decryptedText}</div>
            </div>
        </div >



    );
};

export default Decoder;