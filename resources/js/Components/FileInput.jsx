import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ htmlFor = 'text', className = '', isFocused = false, value = '', ...props }, ref) {
 
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <>
            <label htmlFor={htmlFor} className='flex flex-col justify-center'>
                <img
                    src={value}
                    className="h-auto max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                    alt="" />
            </label>
            <input
                {...props}
                type='file'
                id={htmlFor}
                value=""
                className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm hidden' + className}
                ref={input}
            />
        </>
    );
});
