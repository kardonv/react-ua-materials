interface ApplicationProps {
    names: string[];
}

export function Application({ names }: ApplicationProps) {

    return (
        <div>
            <ul>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </div>
    );
}