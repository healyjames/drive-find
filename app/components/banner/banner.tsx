interface BannerProps {
    children: string
}

export const Banner = (props: BannerProps) => {
    return (
        <div className="absolute top-0 left-0 w-full text-center p-2 text-sm bg-grey-dark text-primary-base">
            <p>{ props.children }</p>
        </div>
    )
}