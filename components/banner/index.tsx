interface BannerProps {
    children: string
}

export const Banner = (props: BannerProps) => {
    return (
        <div className="w-full text-center p-2 text-sm bg-grey-dark text-primary-base">
            <p>{ props.children }</p>
        </div>
    )
}