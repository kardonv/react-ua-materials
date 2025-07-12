import { useEffect, useState } from "react";

interface IComponentProps {
    count: number;
    title: string;
    handleInput: (userValue: string) => void;
}

// function ComponentProps(props: IComponentProps) {
function ComponentProps({ title, count, handleInput }: IComponentProps) {
    const [userInput, setUserInput] = useState<string>("");

    const handleUserInput = (userValue: string) => {
        console.log("User input:", userValue);
        setUserInput(userValue);
    }

    useEffect(() => {
        handleInput(userInput);
    }, [userInput, handleInput]);

    return (
        <div>
            <h2>{title}</h2>
            <p>Count: {count}</p>

            <input type="text" value={userInput} onChange={(e) => handleUserInput(e.target.value)} />
        </div>
    );
};

export default ComponentProps;
