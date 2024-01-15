import { useState } from "react";
class VignereEncode {

    private static readonly ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    static encode(plainText: string, key: string): string {
        let encodedText = '';
        const keyLength = key.length;

        for (let i = 0; i < plainText.length; i++) {
            const plainChar = plainText[i].toUpperCase();
            const keyChar = key[i % keyLength].toUpperCase();

            if (this.ALPHABET.includes(plainChar)) {
                const plainIndex = this.ALPHABET.indexOf(plainChar);
                const keyIndex = this.ALPHABET.indexOf(keyChar);

                const encodedIndex = (plainIndex + keyIndex) % this.ALPHABET.length;
                encodedText += this.ALPHABET[encodedIndex];
            } else {
                // Preserve non-alphabetic characters
                encodedText += plainChar;
            }
        }

        return encodedText.toLowerCase();
    }
}


const Encoder = () => {
    const [plainText, setPlainText] = useState('');
    const [key, setKey] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
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
        const result = VignereEncode.encode(plainText, key);
        setEncryptedText(result);
    };

    const handleClear = () => {
        // Clear the input fields by resetting their corresponding state values
        setPlainText('');
        setKey('');
        setEncryptedText('');
    };

    return (
        <div className="border rounded-lg shadow-lg p-6 my-3 bg-gray-800 text-white">
            <h1 className="text-2xl mb-4">Vigenere Encoder</h1>
            <div className="mb-4">
                <label className="block text-sm">Text to be encoded:</label>
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
                    <p className="text-red-500 text-sm mt-1">
                        Please enter only A-Z and a-z characters.
                    </p>
                )}
            </div>
            <div className="mb-4 flex justify-between">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={handleEncrypt}
                >
                    Encrypt
                </button>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
            <div>
                <label className="block text-sm">Encrypted Text:</label>
                <div className="text-lg font-semibold">{encryptedText}</div>
            </div>
        </div>

    );
};

export default Encoder;