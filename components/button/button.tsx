interface ButtonProps {
    children?: string
}

export const Button = (props: ButtonProps) => {
    return (
        <button className="">
            { props.children }
        </button>
    )
}