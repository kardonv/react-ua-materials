interface IComponentProps {
    title: string;
    count: number;
}

// function ComponentProps(props: IComponentProps) {
function ComponentProps({ title, count }: IComponentProps) {
    return (
        <div>
            <h2>{title}</h2>
            <p>Count: {count}</p>
        </div>
    );
};

export default ComponentProps;
