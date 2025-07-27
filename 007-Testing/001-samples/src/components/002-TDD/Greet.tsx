type GreetProps = {
    name?: string;
}

export function Greet({ name }: GreetProps) {
    return (
        <div>Hello {name}</div>
    );
}