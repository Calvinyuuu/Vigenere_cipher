

const Hero = () => {
    return (
        <div className="flex flex-col justify-center text-center items-center pt-5">
            <p className="pr-1">
                A Simple Vigenère cipher encoder/decoder.
            </p>
            <p>
                Read all about how the Cipher works
                <a className="font-bold" href="https://en.wikipedia.org/wiki/Vigenère_cipher" target="_blank" rel="noopener noreferrer"> here
                </a>
            </p>
        </div>
    )
}

export default Hero